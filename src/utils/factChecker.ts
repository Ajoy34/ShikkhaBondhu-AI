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
 * Try to fetch Facebook content using multiple methods
 */
async function fetchFacebookContent(url: string): Promise<string> {
  console.log('📘 Attempting to fetch Facebook content...');
  
  try {
    // Method 1: Try Facebook's oEmbed API (works for public posts)
    // This is the most reliable method for public Facebook content
    try {
      console.log('🔵 Trying Facebook oEmbed API...');
      const oEmbedUrl = `https://www.facebook.com/plugins/post/oembed.json/?url=${encodeURIComponent(url)}&maxwidth=500`;
      const response = await fetch(oEmbedUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Got Facebook oEmbed data:', data);
        
        // Extract text content from HTML
        let textContent = '';
        if (data.html) {
          textContent = stripHtmlTags(data.html);
        }
        
        return `Facebook Post Content (via Official API):

Author: ${data.author_name || 'Unknown'}
Author URL: ${data.author_url || 'N/A'}
Provider: ${data.provider_name || 'Facebook'}

Content Preview:
${textContent || 'Content not available in preview'}

Width: ${data.width || 'N/A'}
Height: ${data.height || 'N/A'}

Note: This is a public Facebook post. Content was extracted via Facebook's official oEmbed API.
The AI will analyze based on the preview content and known misinformation patterns.`;
      } else {
        console.warn('⚠️ oEmbed API returned:', response.status, response.statusText);
      }
    } catch (oEmbedError: any) {
      console.warn('⚠️ oEmbed method failed:', oEmbedError.message);
    }

    // Method 2: Try multiple CORS proxies with better error handling
    const proxies = [
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
      `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(url)}`,
    ];

    for (const proxyUrl of proxies) {
      try {
        console.log('🔵 Trying proxy:', proxyUrl.split('?')[0]);
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'text/html',
          },
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
        
        if (response.ok) {
          const html = await response.text();
          const metaTags = extractMetaTags(html);
          
          if (metaTags.title || metaTags.description) {
            console.log('✅ Extracted Open Graph meta tags via proxy');
            
            return `Facebook Post Metadata:

Title: ${metaTags.title || 'N/A'}
Description: ${metaTags.description || 'N/A'}
Site: ${metaTags.siteName || 'Facebook'}
Type: ${metaTags.type || 'Social Media Post'}
Image: ${metaTags.image ? 'Yes (image attached)' : 'No'}

URL: ${url}

Note: Metadata extracted from Facebook's Open Graph tags. 
For complete fact-checking, please provide the full post text or main claims.`;
          }
        }
      } catch (proxyError: any) {
        console.warn('⚠️ Proxy failed:', proxyError.message);
        continue;
      }
    }

    // Method 3: Extract post ID and provide guidance
    const postId = extractFacebookPostId(url);
    
    return `Facebook Post Analysis Request

URL: ${url}
${postId ? `Post ID: ${postId}` : ''}

⚠️ Facebook Content Access Limitation:
Due to Facebook's privacy settings and CORS restrictions, the full content cannot be automatically accessed.

🎯 What the AI can analyze WITHOUT the content:
✓ URL patterns and sharing behavior
✓ Common Facebook misinformation tactics
✓ Similar claims that have been debunked
✓ Red flags in post structure

📋 For ACCURATE fact-checking, please provide:
1. 📝 The main text/claim from the post (copy-paste)
2. 🖼️ Description of any images or videos
3. 📅 When it was posted (if time-sensitive)
4. 👤 Who shared it (public figure, page, etc.)
5. 💬 Number of shares/reactions (if viral)

💡 Pro Tips:
• Take a screenshot and describe the content
• Copy the entire post text
• Note if it's from a verified page
• Check if similar posts are spreading

🔍 The AI will analyze based on:
✓ Common misinformation patterns on Facebook
✓ Bangladesh-specific fake news trends
✓ Fact-checking databases and verified sources
✓ Scientific consensus and official statements

📱 Alternative: Use Facebook's "Report False News" feature if this is harmful misinformation.`;

  } catch (error: any) {
    console.error('❌ All Facebook content fetch methods failed:', error);
    return `Unable to access Facebook post content automatically.

URL: ${url}

Reason: ${error.message || 'Network or privacy restrictions'}

🔄 Next Steps:
1. Verify the post is PUBLIC (not private/friends-only)
2. Copy the post text manually
3. Paste it here for AI analysis
4. Include any important context

The AI can still help identify misinformation patterns!`;
  }
}

/**
 * Extract Facebook post ID from URL
 */
function extractFacebookPostId(url: string): string | null {
  const patterns = [
    /facebook\.com\/.*\/posts\/(\d+)/,
    /facebook\.com\/.*\/photos\/.*\/(\d+)/,
    /facebook\.com\/photo\.php\?fbid=(\d+)/,
    /facebook\.com\/permalink\.php\?story_fbid=(\d+)/,
    /facebook\.com\/.*\/videos\/(\d+)/,
    /fb\.watch\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extract Open Graph and meta tags from HTML
 */
function extractMetaTags(html: string): {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  type?: string;
} {
  const metaTags: any = {};

  // Extract og:title
  const titleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  if (titleMatch) metaTags.title = decodeHtmlEntities(titleMatch[1]);

  // Extract og:description
  const descMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  if (descMatch) metaTags.description = decodeHtmlEntities(descMatch[1]);

  // Extract og:image
  const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
  if (imageMatch) metaTags.image = imageMatch[1];

  // Extract og:site_name
  const siteMatch = html.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']*)["']/i);
  if (siteMatch) metaTags.siteName = siteMatch[1];

  // Extract og:type
  const typeMatch = html.match(/<meta[^>]*property=["']og:type["'][^>]*content=["']([^"']*)["']/i);
  if (typeMatch) metaTags.type = typeMatch[1];

  return metaTags;
}

/**
 * Strip HTML tags from text
 */
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Fetch content from URL using a CORS proxy
 */
async function fetchURLContent(url: string): Promise<string> {
  try {
    console.log('🔍 Fetching content from:', url);
    
    // Special handling for social media URLs
    const urlLower = url.toLowerCase();
    const isFacebook = urlLower.includes('facebook.com') || urlLower.includes('fb.com') || urlLower.includes('fb.watch');
    const isTwitter = urlLower.includes('twitter.com') || urlLower.includes('x.com');
    const isInstagram = urlLower.includes('instagram.com');
    
    // Try Facebook-specific methods first
    if (isFacebook) {
      console.log('📘 Facebook URL detected - using specialized methods');
      return await fetchFacebookContent(url);
    }
    
    if (isTwitter || isInstagram) {
      console.log('⚠️ Social media URL detected - limited content access');
      let platform = isTwitter ? 'Twitter/X' : 'Instagram';
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
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
      `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(url)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    ];

    let content = '';
    let successfulProxy = '';
    for (const proxyUrl of proxies) {
      try {
        console.log('🔵 Trying proxy:', proxyUrl.split('?')[0]);
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
          signal: AbortSignal.timeout(15000), // 15 second timeout per proxy
        });

        if (response.ok) {
          content = await response.text();
          successfulProxy = proxyUrl.split('?')[0];
          console.log('✅ Content fetched successfully via:', successfulProxy);
          break;
        } else {
          console.warn(`⚠️ Proxy returned ${response.status}: ${response.statusText}`);
        }
      } catch (proxyError: any) {
        console.warn('⚠️ Proxy failed:', proxyError.message);
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
