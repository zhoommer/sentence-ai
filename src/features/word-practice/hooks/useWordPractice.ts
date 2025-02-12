"use client";

import { useState, useEffect } from "react";
import { wordPracticeService } from "../services/wordPracticeService";
import { Word } from "../types";
import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { statisticsService } from "@/features/statistics/services/statisticsService";
import { subscriptionService } from "@/features/subscription/services/subscriptionService";

type UserLevel = "beginner" | "intermediate" | "advanced";

export const useWordPractice = () => {
  const { user } = useAuth();
  const [turkishSentence, setTurkishSentence] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctTranslation, setCorrectTranslation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [userTranslation, setUserTranslation] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>("beginner");
  const [words, setWords] = useState<Word[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    const loadWords = async () => {
      try {
        const wordList = await wordPracticeService.getWordList();
        setWords(wordList);
      } catch (error) {
        console.error("Kelime listesi yüklenirken hata:", error);
        setError("Kelime listesi yüklenemedi");
      }
    };
    loadWords();
  }, []);

  // Filtreleme fonksiyonu
  const filteredWords = words.filter((word) => {
    const matchesSearch = word.word
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLevel =
      selectedFilter === "all" || word.level === selectedFilter;
    const matchesCategory =
      selectedCategory === "all" || word.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const categories = ["all", ...new Set(words.map((word) => word.category))];
  const levels: { label: string; value: UserLevel }[] = [
    { label: "Başlangıç", value: "beginner" },
    { label: "Orta", value: "intermediate" },
    { label: "Gelişmiş", value: "advanced" },
  ];

  const generateSentence = async (word: string) => {
    setLoading(true);
    setError(null);
    try {
      const sentence = await wordPracticeService.generateSentence(
        word,
        selectedLevel,
      );
      setTurkishSentence(sentence);
      setSelectedWord(word);
      setUserTranslation("");
      setIsCorrect(null);
      setCorrectTranslation("");
    } catch (error) {
      setError("Cümle oluşturulurken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const checkTranslation = async () => {
    if (!userTranslation.trim()) {
      setError("Lütfen çevirinizi girin");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await wordPracticeService.checkTranslation(
        turkishSentence,
        userTranslation,
      );
      setIsCorrect(result.isCorrect);
      setCorrectTranslation(result.correctTranslation);

      // Pratik sonucunu veritabanına kaydet
      if (user) {
        await subscriptionService.incrementUsageAndCheckLimit(user.uid);
        await statisticsService.savePracticeResult(user.uid, {
          word: selectedWord,
          userLevel: selectedLevel,
          isCorrect: result.isCorrect,
          turkishSentence,
          userTranslation,
          correctTranslation: result.correctTranslation,
        });
      }
    } catch (error) {
      setError("Çeviri kontrolü sırasında bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const resetStates = () => {
    setTurkishSentence("");
    setUserTranslation("");
    setIsCorrect(null);
    setCorrectTranslation("");
    setError(null);
  };

  return {
    turkishSentence,
    isCorrect,
    correctTranslation,
    loading,
    error,
    selectedWord,
    userTranslation,
    selectedLevel,
    words,
    filteredWords,
    categories,
    levels,
    searchQuery,
    selectedCategory,
    selectedFilter,
    setUserTranslation,
    setSelectedLevel,
    setSearchQuery,
    setSelectedCategory,
    setSelectedFilter,
    setSelectedWord,
    generateSentence,
    checkTranslation,
    resetStates,
  };
};
