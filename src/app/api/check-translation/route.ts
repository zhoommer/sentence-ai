import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { turkishSentence, userTranslation } = await request.json();

    if (!turkishSentence || !userTranslation) {
      return NextResponse.json(
        { error: "Türkçe cümle ve kullanıcı çevirisi zorunludur" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an English teacher. Evaluate the student's English translation of a Turkish sentence.

IMPORTANT: You must respond with a valid JSON object containing exactly these two fields:
1. "isCorrect" - a boolean (true/false)
2. "correctTranslation" - a string (if isCorrect is false, provide the correct translation; if true, repeat the student's translation)

Turkish sentence: "${turkishSentence}"
Student's translation: "${userTranslation}"

Evaluation rules:
1. Mark as correct (true) if:
   - The meaning is accurately conveyed
   - There are no major grammatical errors
   - Minor spelling or article mistakes can be tolerated
2. Mark as incorrect (false) if:
   - The meaning is wrong or unclear
   - There are major grammatical errors
   - Key words are mistranslated

Respond ONLY with the JSON object. Do not include any other text, markdown formatting, or code blocks.
Example response format:
{"isCorrect":true,"correctTranslation":"The student's translation"}
or
{"isCorrect":false,"correctTranslation":"The correct translation"}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();
    
    try {
      // Yanıttan fazladan karakterleri temizle
      const cleanJson = text.replace(/```json\n|\n```|```/g, "").trim();
      
      console.log("AI yanıtı:", cleanJson); // Debug için

      const data = JSON.parse(cleanJson);

      // Yanıt formatını kontrol et ve gerekirse düzelt
      const formattedResponse = {
        isCorrect: Boolean(data.isCorrect),
        correctTranslation: String(data.correctTranslation || userTranslation)
      };

      return NextResponse.json(formattedResponse);
    } catch (error) {
      console.error("JSON ayrıştırma hatası:", error);
      console.error("Ham yanıt:", text); // Debug için
      
      // Varsayılan yanıt döndür
      return NextResponse.json({
        isCorrect: false,
        correctTranslation: "Çeviri kontrol edilemedi. Lütfen tekrar deneyin."
      });
    }
  } catch (error) {
    console.error("Çeviri kontrolü hatası:", error);
    return NextResponse.json(
      { error: "Çeviri kontrolü sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
} 