const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function analyzeResume(resumeText, jobDescription) {
  const prompt = `You are an expert resume coach and ATS specialist. Compare this resume to the job description and return ONLY valid JSON with no markdown, no explanation, no code fences.

Resume:
${resumeText.slice(0, 4000)}

Job Description:
${jobDescription.slice(0, 2000)}

Return exactly this JSON structure:
{
  "match_score": <integer 0-100>,
  "summary": "<2-3 sentence overview of fit>",
  "remove": ["<specific thing to remove or rephrase>"],
  "add": ["<specific skill/keyword/section to add>"],
  "keep": ["<existing strength that matches the JD well>"]
}

Each array must have 3-6 specific, actionable items.`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = message.content.map(b => b.text || '').join('');
  const clean = raw.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(clean);

  return {
    match_score:        Math.min(100, Math.max(0, parseInt(parsed.match_score) || 0)),
    summary:            parsed.summary || '',
    suggestions_add:    Array.isArray(parsed.add)    ? parsed.add    : [],
    suggestions_remove: Array.isArray(parsed.remove) ? parsed.remove : [],
    suggestions_keep:   Array.isArray(parsed.keep)   ? parsed.keep   : [],
  };
}

module.exports = { analyzeResume };