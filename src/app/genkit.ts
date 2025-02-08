"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserLevel } from "@/features/word-practice/hooks/useWordPractice";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY!);

// Türkçe cümle oluşturma
export async function createTurkishSentence(word: string, userLevel: UserLevel) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const levelDescriptions = {
      beginner: "Basit, günlük hayattan, 5-7 kelimelik kısa cümleler. Temel fiil zamanları (şimdiki zaman, geniş zaman) kullanılmalı.",
      intermediate: "8-10 kelimelik, birleşik cümleler. Daha karmaşık fiil zamanları (geçmiş zaman, gelecek zaman) kullanılabilir.",
      advanced: "10-15 kelimelik, karmaşık yapıda cümleler. Tüm fiil zamanları, edilgen yapı ve dolaylı anlatım kullanılabilir.",
    };

    const prompt = `Sen bir dil öğretmenisin. Sana verilen İngilizce kelimeyi kullanarak Türkçe bir cümle oluştur.
    Cümle ${userLevel} seviyesinde olmalı.
    ${levelDescriptions[userLevel]}
    Cümle günlük hayattan ve anlaşılır olmalı.
    Sadece cümleyi döndür, başka bir şey yazma.
    
    Kelime: "${word}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Cümle oluşturulurken hata:", error);
    throw new Error("Cümle oluşturulamadı. Lütfen tekrar deneyin.");
  }
}

// İngilizce çeviri kontrolü
export async function checkTranslation(
  originalTurkishSentence: string,
  userTranslation: string,
  originalWord: string
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an English teacher. Check the student's translation and respond ONLY with a JSON object. Do not include any additional text, explanation, or formatting.

Input:
Turkish Sentence: "${originalTurkishSentence}"
Student's English Translation: "${userTranslation}"
Required Word: "${originalWord}"

Evaluation criteria:
1. Meaning accuracy
2. Grammar rules
3. Correct usage of "${originalWord}"
4. Word choice

Return EXACTLY in this format (do not include any other text):
{
"isCorrect": true/false,
"feedback": "Türkçe geri bildirim mesajı buraya",
"corrections": "Varsa düzeltme önerisi buraya, yoksa boş string"
}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    
    try {
      // Yanıttan fazladan boşlukları ve satır sonlarını temizle
      const cleanResponse = response.text().trim().replace(/\\n/g, "");
      const parsedResponse = JSON.parse(cleanResponse);
      
      // Yanıt formatını kontrol et
      if (
        typeof parsedResponse.isCorrect !== "boolean" ||
        typeof parsedResponse.feedback !== "string" ||
        typeof parsedResponse.corrections !== "string"
      ) {
        throw new Error("Invalid response format");
      }

      return parsedResponse;
    } catch (parseError) {
      console.error("JSON parse hatası:", parseError);
      console.error("AI yanıtı:", response.text()); // Hata ayıklama için AI yanıtını logla
      
      // Varsayılan yanıt döndür
      return {
        isCorrect: false,
        feedback: "Çeviriniz değerlendirilirken teknik bir hata oluştu. Lütfen tekrar deneyin.",
        corrections: ""
      };
    }
  } catch (error) {
    console.error("API hatası:", error);
    throw new Error("Çeviri kontrol edilemedi. Lütfen tekrar deneyin.");
  }
}

// Kelime listesi oluşturma (Daha sonra bir API'dan veya veritabanından gelecek)
export async function getWordList() {
  // Örnek kelime listesi
  const words = [
    { word: "apple", level: "A1", category: "food" },
    { word: "book", level: "A1", category: "education" },
    { word: "computer", level: "A2", category: "technology" },
    { word: "house", level: "A1", category: "home" },
    { word: "car", level: "A1", category: "transportation" },
    { word: "dog", level: "A1", category: "animals" },
    { word: "cat", level: "A1", category: "animals" },
    { word: "smartphone", level: "A1", category: "technology" },
    { word: "table", level: "A1", category: "furniture" },
    { word: "chair", level: "A1", category: "furniture" },
    { word: "door", level: "A1", category: "home" },
    { word: "window", level: "A1", category: "home" },
    { word: "tree", level: "A1", category: "nature" },
    { word: "flower", level: "A1", category: "nature" },
    { word: "sun", level: "A1", category: "nature" },
    { word: "moon", level: "A1", category: "nature" },
    { word: "star", level: "A1", category: "nature" },
    { word: "water", level: "A1", category: "nature" },
    { word: "bread", level: "A1", category: "food" },
    { word: "milk", level: "A1", category: "food" },
    { word: "coffee", level: "A1", category: "food" },
    { word: "tea", level: "A1", category: "food" },
    { word: "school", level: "A1", category: "education" },
    { word: "teacher", level: "A1", category: "education" },
    { word: "student", level: "A1", category: "education" },
    { word: "pencil", level: "A1", category: "education" },
    { word: "paper", level: "A1", category: "education" },
    { word: "friend", level: "A1", category: "relationships" },
    { word: "family", level: "A1", category: "relationships" },
    { word: "mother", level: "A1", category: "relationships" },
    { word: "father", level: "A1", category: "relationships" },
    { word: "sister", level: "A1", category: "relationships" },
    { word: "brother", level: "A1", category: "relationships" },
    { word: "doctor", level: "A1", category: "professions" },
    { word: "nurse", level: "A1", category: "professions" },
    { word: "police", level: "A1", category: "professions" },
    { word: "professor", level: "A1", category: "professions" },
    { word: "chef", level: "A2", category: "professions" },
    { word: "airplane", level: "A2", category: "transportation" },
    { word: "train", level: "A2", category: "transportation" },
    { word: "bus", level: "A1", category: "transportation" },
    { word: "bicycle", level: "A2", category: "transportation" },
    { word: "ship", level: "A2", category: "transportation" },
    { word: "hospital", level: "A2", category: "places" },
    { word: "restaurant", level: "A2", category: "places" },
    { word: "park", level: "A1", category: "places" },
    { word: "beach", level: "A2", category: "places" },
    { word: "mountain", level: "A2", category: "nature" },
    { word: "river", level: "A2", category: "nature" },
    { word: "ocean", level: "A2", category: "nature" },
    { word: "forest", level: "A2", category: "nature" },
    { word: "weather", level: "A2", category: "nature" },
    { word: "rain", level: "A1", category: "nature" },
    { word: "snow", level: "A1", category: "nature" },
    { word: "wind", level: "A2", category: "nature" },
    { word: "cloud", level: "A1", category: "nature" },
    { word: "storm", level: "A2", category: "nature" },
    { word: "clothes", level: "A1", category: "clothing" },
    { word: "shirt", level: "A1", category: "clothing" },
    { word: "pants", level: "A1", category: "clothing" },
    { word: "shoes", level: "A1", category: "clothing" },
    { word: "hat", level: "A1", category: "clothing" },
    { word: "jacket", level: "A1", category: "clothing" },
    { word: "dress", level: "A1", category: "clothing" },
    { word: "socks", level: "A1", category: "clothing" },
    { word: "glasses", level: "A2", category: "accessories" },
    { word: "watch", level: "A1", category: "accessories" },
    { word: "bag", level: "A1", category: "accessories" },
    { word: "wallet", level: "A2", category: "accessories" },
    { word: "key", level: "A1", category: "accessories" },
    { word: "laptop", level: "A2", category: "technology" },
    { word: "tablet", level: "A2", category: "technology" },
    { word: "camera", level: "A2", category: "technology" },
    { word: "television", level: "A2", category: "technology" },
    { word: "radio", level: "A2", category: "technology" },
    { word: "internet", level: "A2", category: "technology" },
    { word: "email", level: "A2", category: "technology" },
    { word: "website", level: "A2", category: "technology" },
    { word: "password", level: "A2", category: "technology" },
    { word: "music", level: "A1", category: "entertainment" },
    { word: "movie", level: "A1", category: "entertainment" },
    { word: "game", level: "A1", category: "entertainment" },
    { word: "sport", level: "A1", category: "entertainment" },
    { word: "football", level: "A1", category: "sports" },
    { word: "basketball", level: "A2", category: "sports" },
    { word: "tennis", level: "A2", category: "sports" },
    { word: "swimming", level: "A2", category: "sports" },
    { word: "running", level: "A1", category: "sports" },
    { word: "dancing", level: "A2", category: "entertainment" },
    { word: "singing", level: "A2", category: "entertainment" },
    { word: "painting", level: "A2", category: "hobbies" },
    { word: "reading", level: "A1", category: "hobbies" },
    { word: "writing", level: "A1", category: "hobbies" },
    { word: "cooking", level: "A2", category: "hobbies" },
    { word: "gardening", level: "A2", category: "hobbies" },
    { word: "shopping", level: "A1", category: "activities" },
    { word: "traveling", level: "A2", category: "activities" },
    { word: "working", level: "A1", category: "activities" },
    { word: "studying", level: "A1", category: "activities" },
    { word: "sleeping", level: "A1", category: "activities" },
    { word: "eating", level: "A1", category: "activities" },
    { word: "drinking", level: "A1", category: "activities" },
    { word: "walking", level: "A1", category: "activities" },
    { word: "talking", level: "A1", category: "activities" },
    { word: "listening", level: "A1", category: "activities" }
  ];

  return words;
}
