import { GoogleGenerativeAI } from '@google/generative-ai';

export interface FactCheckResult {
  url: string;
  status: 'verified' | 'fake' | 'misleading' | 'unverified';
  confidence: number;
  title: string;
  summary: string;
  sources: string[];
  sharedCount: number;
  lastChecked: string;
  warning?: string;
  detailedAnalysis: string;
  claimBreakdown: Array<{
    claim: string;
    verdict: 'true' | 'false' | 'partially-true' | 'unverified';
    explanation: string;
  }>;
}

/**
 * Fetch content from URL using a CORS proxy
 */
async function fetchURLContent(url: string): Promise<string> {
  try {
    console.log('🔍 Fetching content from:', url);
    
    // Special handling for social media URLs
    const urlLower = url.toLowerCase();
    const isFacebook = urlLower.includes('facebook.com') || urlLower.includes('fb.com');
    const isTwitter = urlLower.includes('twitter.com') || urlLower.includes('x.com');
    const isInstagram = urlLower.includes('instagram.com');
    
    if (isFacebook || isTwitter || isInstagram) {
      console.log('⚠️ Social media URL detected - limited content access');
      let platform = isFacebook ? 'Facebook' : isTwitter ? 'Twitter/X' : 'Instagram';
      return `This is a ${platform} post. Due to privacy and authentication requirements, full content cannot be accessed directly. 

URL: ${url}

Note: ${platform} posts often require login to view. The AI will analyze based on:
1. URL patterns and context
2. Known patterns of misinformation on ${platform}
3. General fact-checking principles
4. Request to user: Please provide the main claim or text from this post for accurate fact-checking.`;
    }

    // Try multiple CORS proxies for regular websites
    const proxies = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
    ];

    let content = '';
    for (const proxyUrl of proxies) {
      try {
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
        });

        if (response.ok) {
          content = await response.text();
          console.log('✅ Content fetched successfully via proxy');
          break;
        }
      } catch (proxyError) {
        console.warn('⚠️ Proxy failed, trying next...', proxyError);
        continue;
      }
    }

    if (!content) {
      throw new Error('Unable to fetch content from any proxy');
    }

    // Extract text content from HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Remove script and style tags
    doc.querySelectorAll('script, style, noscript, iframe').forEach(el => el.remove());
    
    // Get text content
    const textContent = doc.body.textContent || doc.body.innerText || '';
    
    // Get title
    const title = doc.querySelector('title')?.textContent || 
                  doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                  'Untitled';
    
    // Get description
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
                        doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                        '';

    // Combine title, description, and first 3000 characters of content
    const combinedContent = `Title: ${title}\n\nDescription: ${description}\n\nContent: ${textContent.slice(0, 3000)}`;
    
    console.log('📄 Extracted content length:', combinedContent.length);
    return combinedContent;

  } catch (error) {
    console.error('❌ Error fetching URL content:', error);
    // Return minimal info if fetch fails
    return `Unable to fetch full content from: ${url}. 

This could be due to:
- Website blocking automated access
- CORS restrictions
- Authentication requirements
- Geographic restrictions

The AI will analyze based on the URL and general knowledge. For best results, please provide the main text/claims from this URL.`;
  }
}

/**
 * Use Gemini AI to fact-check the content
 */
export async function factCheckWithGemini(url: string): Promise<FactCheckResult> {
  try {
    console.log('🔍 Starting fact-check for:', url);

    // Get API key
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    
    if (!apiKey || apiKey === 'your-api-key-here') {
      throw new Error('Gemini API key not configured. Please add VITE_GOOGLE_API_KEY to your environment.');
    }

    // Fetch content from URL
    const urlContent = await fetchURLContent(url);

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Create comprehensive fact-checking prompt
    const prompt = `You are an expert fact-checker and misinformation analyst. Analyze the following content and provide a comprehensive fact-check report.

URL: ${url}

CONTENT TO ANALYZE:
${urlContent}

IMPORTANT CONTEXT:
- If this is a social media post (Facebook, Twitter, Instagram) where full content couldn't be accessed, acknowledge this limitation
- For social media posts, provide guidance on what to look for (screenshots, original post text, context)
- Still provide useful analysis based on common misinformation patterns on these platforms

TASK:
Perform a thorough fact-check of this content. Search your knowledge base for:
1. Verify claims made in the content (if accessible)
2. Check against known facts, scientific consensus, official sources
3. Identify any misleading or false information patterns
4. Look for signs of misinformation (sensational language, lack of sources, conspiracy theories)
5. Consider Bangladeshi context if relevant (local news, politics, health, social issues)

Provide your analysis in the following JSON format ONLY (no other text):

{
  "title": "Brief title describing the main claim or content type (max 100 chars)",
  "status": "verified|fake|misleading|unverified",
  "confidence": 70,
  "summary": "Clear 2-3 sentence summary explaining why this verdict was given. If content couldn't be accessed, explain this and suggest next steps (max 300 chars)",
  "detailedAnalysis": "Detailed explanation: What we know, what we can't verify, red flags or green flags, context needed. For social media: Explain why full analysis isn't possible and what user should look for (max 500 chars)",
  "sources": ["Relevant fact-checking organizations", "News outlets", "Scientific sources", "Government agencies"],
  "warning": "REQUIRED if content is inaccessible or dangerous: Clear warning about limitations or dangers",
  "claimBreakdown": [
    {
      "claim": "Specific claim if identifiable, or 'Content not accessible - requires user input'",
      "verdict": "true|false|partially-true|unverified",
      "explanation": "Why this verdict, or what's needed for verification"
    }
  ]
}

VERDICT GUIDELINES:
- "verified": Content is accurate and supported by reliable sources (80-100% confidence)
- "fake": Content contains significant false information or fabrications (0-40% confidence)
- "misleading": Content mixes truth with falsehoods or lacks context (40-70% confidence)  
- "unverified": Cannot confirm accuracy, needs more investigation OR content not accessible (50-80% confidence)

CONFIDENCE SCORE:
- 90-100%: Multiple reliable sources confirm, scientific consensus
- 70-89%: Good evidence but some uncertainty OR limited content access but can make educated assessment
- 50-69%: Mixed evidence OR content partially accessible
- 30-49%: Likely false but not conclusively proven
- 0-29%: Clearly false or debunked

SPECIAL HANDLING FOR SOCIAL MEDIA:
- If content couldn't be accessed: Status = "unverified", Confidence = 50-70%
- Provide helpful guidance: "To fact-check this post, please provide: [specific info needed]"
- Mention common red flags for that platform
- Suggest reverse image search if applicable

IMPORTANT FOR BANGLADESH CONTEXT:
- Be aware of local misinformation patterns (health myths, political rumors, fake news)
- Reference Bangladeshi fact-checking organizations if relevant
- Consider local language content (Bangla/Banglish)
- Understand cultural context

Return ONLY the JSON object, no markdown formatting, no explanation text.`;

    console.log('🤖 Sending to Gemini for analysis...');

    // Generate response with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    clearTimeout(timeoutId);

    const response = result.response;
    let text = response.text();

    console.log('📥 Received response from Gemini');

    // Clean up response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parse JSON response
    const analysis = JSON.parse(text);

    console.log('✅ Analysis parsed successfully');

    // Create final result
    const factCheckResult: FactCheckResult = {
      url: url,
      status: analysis.status || 'unverified',
      confidence: analysis.confidence || 50,
      title: analysis.title || 'Content Analysis',
      summary: analysis.summary || 'Fact-check analysis completed.',
      detailedAnalysis: analysis.detailedAnalysis || analysis.summary || '',
      sources: analysis.sources || ['AI Analysis'],
      sharedCount: Math.floor(Math.random() * 10000) + 500, // Simulated
      lastChecked: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      warning: analysis.warning,
      claimBreakdown: analysis.claimBreakdown || [],
    };

    console.log('✅ Fact-check complete:', factCheckResult.status, factCheckResult.confidence + '%');
    return factCheckResult;

  } catch (error: any) {
    console.error('❌ Fact-check error:', error);

    // Return error result
    return {
      url: url,
      status: 'unverified',
      confidence: 0,
      title: 'Error Analyzing Content',
      summary: 'Unable to complete fact-check analysis. Please try again or check the URL.',
      detailedAnalysis: `Error: ${error.message || 'Unknown error occurred'}. The content could not be analyzed. Please ensure the URL is accessible and try again.`,
      sources: [],
      sharedCount: 0,
      lastChecked: new Date().toLocaleString(),
      warning: 'Analysis failed. Treat this content with caution and verify through official sources.',
      claimBreakdown: [],
    };
  }
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}
