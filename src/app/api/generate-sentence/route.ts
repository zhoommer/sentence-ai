import { NextResponse } from "next/server";
import { createTurkishSentence } from "@/lib/genkit";

export async function POST(request: Request) {
  try {
    const { word, level } = await request.json();

    if (!word || !level) {
      return NextResponse.json(
        { error: "Kelime ve seviye zorunludur" },
        { status: 400 },
      );
    }

    const sentence = await createTurkishSentence(word, level);

    return NextResponse.json({ sentence });
  } catch (error) {
    console.error("Cümle oluşturma hatası:", error);
    return NextResponse.json(
      { error: "Cümle oluşturulurken bir hata oluştu" },
      { status: 500 },
    );
  }
}

