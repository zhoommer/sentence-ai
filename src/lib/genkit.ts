import { GoogleGenerativeAI } from "@google/generative-ai";
import { Word } from "@/features/word-practice/types";
import { wordList } from "./words";

type UserLevel = "beginner" | "intermediate" | "advanced";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY!,
);

const levelDescriptions: Record<UserLevel, string> = {
  beginner:
    "Basit, günlük hayattan, 5-7 kelimelik kısa cümleler. Temel fiil zamanları (şimdiki zaman, geniş zaman) kullanılmalı.",
  intermediate:
    "8-10 kelimelik, birleşik cümleler. Daha karmaşık fiil zamanları (geçmiş zaman, gelecek zaman) kullanılabilir.",
  advanced:
    "10-15 kelimelik, karmaşık yapıda cümleler. Tüm fiil zamanları, edilgen yapı ve dolaylı anlatım kullanılabilir.",
};

export async function createTurkishSentence(
  word: string,
  userLevel: UserLevel,
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Sen bir dil öğretmenisin. Sana verilen İngilizce kelimeyi kullanarak Türkçe bir cümle oluştur.
    Cümle ${userLevel} seviyesinde olmalı.
    ${levelDescriptions[userLevel]}
    Cümle günlük hayattan ve anlaşılır olmalı.
    Sadece cümleyi döndür, başka bir şey yazma.
    
    Kelime: "${word}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Cümle oluşturma hatası:", error);
    throw new Error("Cümle oluşturulurken bir hata oluştu");
  }
}

export async function getWordList(): Promise<Word[]> {
  return wordList;
}
