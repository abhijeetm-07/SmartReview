const { GoogleGenAI } = require("@google/genai");
const Audit = require("../models/Audit");

const client = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY,
});

const generateReview = async (req, res) => {
  try {
    const { code, language } = req.body;
    const userId = req.user.id;

    const prompt = `
You are an expert ${language} developer.

Analyze the code below and return ONLY valid JSON
in this exact format:

{
  "score": number,
  "bugs": string[],
  "suggestions": string[]
}

Code:
${code}
`;

    const result = await client.models.generateContent({
      model: "gemini-1.0-pro", // ✅ WORKS FOR YOUR KEY
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    const text = result.candidates[0].content.parts[0].text;

    let parsedFeedback;
    try {
      parsedFeedback = JSON.parse(text);
    } catch {
      parsedFeedback = {
        score: 0,
        bugs: [],
        suggestions: [],
        raw: text,
      };
    }

    const newAudit = await Audit.create({
      user: userId,
      codeSnippet: code,
      language,
      aiResponse: parsedFeedback,
    });

    return res.status(200).json(newAudit);
  } catch (error) {
    console.error("DEBUG AI ERROR:", error);
    return res.status(500).json({
      message: "AI Review failed",
      error: error.message,
    });
  }
};

module.exports = { generateReview };
