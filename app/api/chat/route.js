import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // ✔ Correct extraction for latest API
    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response from Gemini.";

    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ response: "Gemini API Error" }, { status: 500 });
  }
}
