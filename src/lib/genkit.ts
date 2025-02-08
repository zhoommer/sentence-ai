import { GoogleGenerativeAI } from "@google/generative-ai";
import { Word } from "@/features/word-practice/types";

type UserLevel = "beginner" | "intermediate" | "advanced";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY!);

const levelDescriptions: Record<UserLevel, string> = {
  beginner: "Basit, günlük hayattan, 5-7 kelimelik kısa cümleler. Temel fiil zamanları (şimdiki zaman, geniş zaman) kullanılmalı.",
  intermediate: "8-10 kelimelik, birleşik cümleler. Daha karmaşık fiil zamanları (geçmiş zaman, gelecek zaman) kullanılabilir.",
  advanced: "10-15 kelimelik, karmaşık yapıda cümleler. Tüm fiil zamanları, edilgen yapı ve dolaylı anlatım kullanılabilir.",
};

// Örnek kelime listesi
const wordList: Word[] = [
  { word: "book", level: "beginner", category: "objects" },
  { word: "read", level: "beginner", category: "actions" },
  { word: "write", level: "beginner", category: "actions" },
  { word: "computer", level: "beginner", category: "technology" },
  { word: "phone", level: "beginner", category: "technology" },
  { word: "happy", level: "beginner", category: "emotions" },
  { word: "sad", level: "beginner", category: "emotions" },
  { word: "beautiful", level: "intermediate", category: "descriptions" },
  { word: "interesting", level: "intermediate", category: "descriptions" },
  { word: "technology", level: "intermediate", category: "technology" },
  { word: "development", level: "intermediate", category: "technology" },
  { word: "experience", level: "intermediate", category: "general" },
  { word: "opportunity", level: "advanced", category: "general" },
  { word: "responsibility", level: "advanced", category: "general" },
  { word: "achievement", level: "advanced", category: "general" },
  { word: "determination", level: "advanced", category: "emotions" },
  { word: "enthusiasm", level: "advanced", category: "emotions" },
  { word: "collaboration", level: "advanced", category: "actions" },
  { word: "implementation", level: "advanced", category: "technology" },
  { word: "innovation", level: "advanced", category: "technology" },
];

export async function createTurkishSentence(word: string, userLevel: UserLevel): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
  // Şimdilik statik kelime listesini döndürüyoruz
  // İleride bu fonksiyon bir API'den veya veritabanından kelime listesini çekebilir
  return wordList;
} 