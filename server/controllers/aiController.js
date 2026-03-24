const { GoogleGenerativeAI } = require("@google/generative-ai"); // Standard SDK
const Audit = require("../models/Audit");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

const generateReview = async (req, res) => {
  try {
    const { code, language } = req.body;
    const userId = req.user.id;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Review this ${language} code. 
    Return ONLY valid JSON: {"score": number, "bugs": [], "suggestions": []}.
    Code: ${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let rawText = response.text();

    // Clean Markdown backticks if Gemini includes them
    rawText = rawText.replace(/```json|```/g, "").trim();

    let parsedFeedback;
    try {
      parsedFeedback = JSON.parse(rawText);
    } catch (err) {
      console.error("JSON Parse Error:", rawText);
      parsedFeedback = {
        score: 0,
        bugs: ["AI response format error"],
        suggestions: [],
      };
    }

    const newAudit = await Audit.create({
      user: userId,
      content: code,
      language: language || "javascript",
      aiResponse: JSON.stringify(parsedFeedback),
    });

    return res.status(200).json(newAudit);
  } catch (error) {
    res.status(500).json({ message: "Review failed", error: error.message });
  }
};
