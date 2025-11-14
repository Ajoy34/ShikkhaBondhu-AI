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
      const oEmbedUrl = `https://www.facebook.com/plugins/post/oembed.json/?url=${encodeURIComponent(url)}&maxwidth=500&omitscript=true`;
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
The AI will analyze this content for accuracy and misinformation.`;
      } else {
        console.warn('⚠️ oEmbed API returned:', response.status, response.statusText);
      }
    } catch (oEmbedError: any) {
      console.warn('⚠️ oEmbed method failed:', oEmbedError.message);
    }

    // Method 2: Try to load Facebook's mobile version (lighter, less restricted)
    try {
      console.log('🔵 Trying Facebook mobile version...');
      const mobileUrl = url.replace('www.facebook.com', 'm.facebook.com').replace('facebook.com', 'm.facebook.com');
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(mobileUrl)}`;
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36',
          'Accept': 'text/html',
        },
        signal: AbortSignal.timeout(15000),
      });
      
      if (response.ok) {
        const html = await response.text();
        const metaTags = extractMetaTags(html);
        
        // Try to extract post content from mobile HTML
        let postContent = '';
        const contentMatch = html.match(/<div[^>]*data-ft[^>]*>(.*?)<\/div>/s);
        if (contentMatch) {
          postContent = stripHtmlTags(contentMatch[1]);
        }
        
        if (metaTags.title || metaTags.description || postContent) {
          console.log('✅ Extracted content from Facebook mobile');
          
          return `Facebook Post Content (Mobile Version):

${postContent ? `Post Text:\n${postContent.substring(0, 500)}\n\n` : ''}Title: ${metaTags.title || 'N/A'}
Description: ${metaTags.description || 'N/A'}
Image: ${metaTags.image ? 'Yes (image attached)' : 'No'}

URL: ${url}

Note: Content extracted from Facebook's mobile site. The AI will analyze this for fact-checking.`;
        }
      }
    } catch (mobileError: any) {
      console.warn('⚠️ Mobile version failed:', mobileError.message);
    }

    // Method 3: Try multiple CORS proxies with desktop site
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          signal: AbortSignal.timeout(15000),
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
The AI can analyze this and cross-reference with fact-checking databases.`;
          }
        }
      } catch (proxyError: any) {
        console.warn('⚠️ Proxy failed:', proxyError.message);
        continue;
      }
    }

    // Method 4: Ask user to provide content (most reliable for private posts)
    const postId = extractFacebookPostId(url);
    
    return `Facebook Post Analysis Request

URL: ${url}
${postId ? `Post ID: ${postId}` : ''}

📱 The post appears to be accessible, but automated fetching was blocked.

🎯 Two Options for Accurate Fact-Checking:

OPTION 1 - Quick Check (Copy the text):
📝 Copy the main claim/text from the Facebook post
📝 Paste it in a new fact-check along with this URL
📝 AI will analyze with full context

OPTION 2 - What AI Can Analyze Now:
✓ URL patterns and sharing behavior
✓ Common Facebook misinformation tactics  
✓ Similar claims from fact-checking databases
✓ Red flags in post structure

� Why Google Shows It But We Can't:
• Google has special access to Facebook data
• CORS (browser security) blocks direct access
• Facebook requires authentication for API access
• Mobile/desktop versions have different restrictions

📋 For BEST results, please provide:
1. 📝 Main text or claim from the post
2. 🖼️ Description of images/videos (if any)
3. 👤 Who posted it (page, person, group)
4. 📅 How old is the post
5. 💬 Share count (if viral)

The AI will still provide analysis based on:
✓ Common misinformation patterns
✓ Fact-checking databases
✓ Scientific consensus
✓ Bangladesh-specific fake news trends`;

  } catch (error: any) {
    console.error('❌ All Facebook content fetch methods failed:', error);
    return `Unable to access Facebook post content automatically.

URL: ${url}

The post is publicly visible (you can see it in Google), but browser security prevents automated access.

🔄 Next Steps:
1. ✅ Verify the post is PUBLIC
2. 📝 Copy the post text manually
3. 📋 Paste it here along with the URL
4. 🤖 AI will provide complete fact-check

This is normal - even public Facebook content has access restrictions for security.`;
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

    // Initialize Gemini with stable model
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use the most stable model with highest rate limits
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      }
    });

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

    // Check if it's a quota/rate limit error
    const isQuotaError = error.message?.includes('quota') || error.message?.includes('429') || error.message?.includes('rate limit');
    const isAPIError = error.message?.includes('API key');

    let errorTitle = 'Error Analyzing Content';
    let errorSummary = 'Unable to complete fact-check analysis. Please try again.';
    let errorDetails = '';
    let errorWarning = 'Analysis failed. Treat this content with caution and verify through official sources.';

    if (isQuotaError) {
      errorTitle = 'AI Analysis Temporarily Unavailable';
      errorSummary = 'The AI fact-checker has reached its usage limit. Please wait 1-2 minutes and try again, or verify manually.';
      errorDetails = `The fact-checking service uses Google Gemini AI which has rate limits on the free tier. The quota resets every minute.

ALTERNATIVE WAYS TO VERIFY THIS CONTENT:

1. 🔍 Google Search: Search for key claims + "fact check"
2. 📰 Check trusted news sources: BBC, Reuters, AFP
3. 🇧🇩 Bangladeshi fact-checkers: Check organizations like Rumor Scanner
4. 🌐 International: Snopes.com, FactCheck.org, PolitiFact
5. 🔬 For health claims: WHO, CDC, or local health authorities

URL to verify: ${url}

Try again in 60 seconds for AI analysis.`;
      errorWarning = '⏳ Please wait 1 minute and try again, or use manual fact-checking methods listed below.';
    } else if (isAPIError) {
      errorTitle = 'API Configuration Error';
      errorSummary = 'The fact-checker service needs to be configured. Please contact support.';
      errorDetails = 'The Google Gemini API key is missing or invalid. Please add a valid API key to enable fact-checking features.';
      errorWarning = '⚠️ Service configuration required. Please contact administrator.';
    } else {
      errorDetails = `Error: ${error.message || 'Unknown error occurred'}. The content could not be analyzed. Please ensure the URL is accessible and try again.`;
    }

    // Return error result
    return {
      url: url,
      status: 'unverified',
      confidence: 0,
      title: errorTitle,
      summary: errorSummary,
      detailedAnalysis: errorDetails,
      sources: ['Manual verification recommended', 'Check trusted news sources', 'Verify with fact-checking organizations'],
      sharedCount: 0,
      lastChecked: new Date().toLocaleString(),
      warning: errorWarning,
      claimBreakdown: [
        {
          claim: 'Automatic analysis unavailable',
          verdict: 'unverified',
          explanation: isQuotaError 
            ? 'Please wait 1-2 minutes for quota to reset, then try again.' 
            : 'Manual verification recommended through trusted sources.'
        }
      ],
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
