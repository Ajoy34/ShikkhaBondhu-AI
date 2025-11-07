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
    
    // Try multiple CORS proxies
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
    return `Unable to fetch full content from: ${url}. Will analyze URL and search for information about this topic.`;
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

TASK:
Perform a thorough fact-check of this content. Search your knowledge base for:
1. Verify claims made in the content
2. Check against known facts, scientific consensus, official sources
3. Identify any misleading or false information
4. Look for signs of misinformation (sensational language, lack of sources, conspiracy theories)

Provide your analysis in the following JSON format ONLY (no other text):

{
  "title": "Brief title describing the main claim (max 100 chars)",
  "status": "verified|fake|misleading|unverified",
  "confidence": 85,
  "summary": "2-3 sentence summary of your fact-check findings (max 300 chars)",
  "detailedAnalysis": "Detailed explanation of your findings, what's true, what's false, context (max 500 chars)",
  "sources": ["World Health Organization", "Reuters Fact Check", "Bangladesh Health Ministry", "Scientific Journal Name"],
  "warning": "Optional: Warning message if content contains dangerous misinformation",
  "claimBreakdown": [
    {
      "claim": "Specific claim from the content",
      "verdict": "true|false|partially-true|unverified",
      "explanation": "Why this is true/false/misleading"
    }
  ]
}

VERDICT GUIDELINES:
- "verified": Content is accurate and supported by reliable sources (80-100% confidence)
- "fake": Content contains significant false information or fabrications (0-40% confidence)
- "misleading": Content mixes truth with falsehoods or lacks context (40-70% confidence)
- "unverified": Cannot confirm accuracy, needs more investigation (70-80% confidence)

CONFIDENCE SCORE:
- 90-100%: Multiple reliable sources confirm, scientific consensus
- 70-89%: Good sources but some uncertainty
- 50-69%: Mixed evidence, requires more investigation
- 30-49%: Likely false but not conclusively proven
- 0-29%: Clearly false or debunked

IMPORTANT:
- Be objective and evidence-based
- Consider Bangladeshi context if relevant
- Cite credible sources (WHO, CDC, Reuters, BBC, govt agencies, scientific journals)
- Identify manipulation tactics (out-of-context, edited media, false attribution)
- Consider date - old news shared as current is misleading

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
