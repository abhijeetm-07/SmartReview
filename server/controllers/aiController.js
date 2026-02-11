require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const Audit = require("../models/Audit");

const ai = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY,
});

const generateReview = async (req, res) => {
  try {
    const { code, language } = req.body;
    const userId = req.user.id;

    if (!code || !language) {
      return res
        .status(400)
        .json({ message: "Code and language are required" });
    }

    const prompt = `
You are an expert ${language} code reviewer.

STRICT RULES:
- Respond with ONLY valid JSON
- Do NOT include markdown
- Do NOT include explanations outside JSON

JSON FORMAT:
{
  "score": number,
  "bugs": string[],
  "suggestions": string[]
}

Code:
${code}
`;

    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    });

    const rawText = response.text;

    let parsedFeedback;
    try {
      parsedFeedback = JSON.parse(rawText);
    } catch (err) {
      parsedFeedback = {
        score: 0,
        bugs: [],
        suggestions: [],
        raw: rawText,
      };
    }

    const newAudit = await Audit.create({
      user: userId,
      content: code, // Changed from codeSnippet to content to match your Schema
      language,
      aiResponse: JSON.stringify(parsedFeedback),
    });

    return res.status(200).json(newAudit);
  } catch (error) {
    console.error("AI ERROR:", error);
    return res.status(500).json({
      message: "AI Review failed",
      error: error.message,
    });
  }
};

module.exports = { generateReview };
