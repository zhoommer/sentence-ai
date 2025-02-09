"use client";

import {
  createTurkishSentence,
  getWordList as getWordListFromGenkit,
} from "@/lib/genkit";
import { Word } from "../types";

type UserLevel = "beginner" | "intermediate" | "advanced";

export const wordPracticeService = {
  // Kelime listesini getir
  getWordList: async (): Promise<Word[]> => {
    try {
      const wordList = await getWordListFromGenkit();
      return wordList;
    } catch (error) {
      console.error("Kelime listesi getirme hatası:", error);
      throw new Error("Kelime listesi getirilirken bir hata oluştu");
    }
  },

  // Çeviri kontrolü
  checkTranslation: async (
    turkishSentence: string,
    userTranslation: string,
  ) => {
    const response = await fetch("/api/check-translation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        turkishSentence,
        userTranslation,
      }),
    });

    if (!response.ok) {
      throw new Error("Çeviri kontrolü sırasında bir hata oluştu");
    }

    return await response.json();
  },

  // Türkçe cümle oluşturma
  generateSentence: async (word: string, userLevel: UserLevel) => {
    try {
      const sentence = await createTurkishSentence(word, userLevel);
      return sentence;
    } catch (error) {
      console.error("Cümle oluşturma hatası:", error);
      throw new Error("Cümle oluşturulurken bir hata oluştu");
    }
  },
};

