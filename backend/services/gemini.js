const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function analyzeResume(resumeText, jobDescription) {
  const prompt = `You are an expert resume coach and ATS (Applicant Tracking System) specialist. 
  Compare the following resume text to the job description provided. 
  
  Resume:
  ${resumeText}
  
  Job Description:
  ${jobDescription}
  
  Analyze the fit and return exactly this JSON structure (and ONLY the JSON, no markdown formatting):
  {
    "match_score": <integer 0-100>,
    "summary": "<2-3 sentence overview of why this resume matches or doesn't match the job>",
    "remove": ["<specific thing to remove, rephrase, or downplay>"],
    "add": ["<specific skill, keyword, or experience to add or highlight>"],
    "keep": ["<existing strength that matches the job description perfectly>"]
  }
  
  Each list (remove, add, keep) should have 3-5 high-impact, specific points.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean potential markdown code blocks
    text = text.replace(/```json|```/g, "").trim();
    
    const parsed = JSON.parse(text);
    
    return {
      match_score: Math.min(100, Math.max(0, parseInt(parsed.match_score) || 0)),
      summary: parsed.summary || "",
      suggestions_add: Array.isArray(parsed.add) ? parsed.add : [],
      suggestions_remove: Array.isArray(parsed.remove) ? parsed.remove : [],
      suggestions_keep: Array.isArray(parsed.keep) ? parsed.keep : [],
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze resume with Gemini AI.");
  }
}

module.exports = { analyzeResume };
