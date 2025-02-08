"use client";

import { useState, useEffect } from "react";
import { createTurkishSentence, checkTranslation, getWordList } from "@/app/genkit";

type Word = {
  word: string;
  level: string;
  category: string;
};

export type UserLevel = "beginner" | "intermediate" | "advanced";

export const useWordPractice = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [turkishSentence, setTurkishSentence] = useState("");
  const [userTranslation, setUserTranslation] = useState("");
  const [aiResponse, setAiResponse] = useState<{
    isCorrect: boolean;
    feedback: string;
    corrections?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [userLevel, setUserLevel] = useState<UserLevel>("beginner");

  // Kelime listesini yükle
  useEffect(() => {
    const loadWords = async () => {
      const wordList = await getWordList();
      setWords(wordList);
    };
    loadWords();
  }, []);

  // Filtreleme fonksiyonu
  const filteredWords = words.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || word.level === selectedLevel;
    const matchesCategory = selectedCategory === "all" || word.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Benzersiz kategorileri ve seviyeleri al
  const categories = ["all", ...new Set(words.map(word => word.category))];
  const levels = ["all", ...new Set(words.map(word => word.level))];

  const handleGenerateSentence = async () => {
    setLoading(true);
    try {
      const sentence = await createTurkishSentence(selectedWord, userLevel);
      setTurkishSentence(sentence);
      setUserTranslation("");
      setAiResponse(null);
    } catch (error) {
      console.error("Cümle oluşturulurken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckTranslation = async () => {
    setLoading(true);
    try {
      const response = await checkTranslation(turkishSentence, userTranslation, selectedWord);
      setAiResponse(response);
    } catch (error) {
      console.error("Çeviri kontrol edilirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedWord,
    setSelectedWord,
    searchQuery,
    setSearchQuery,
    turkishSentence,
    setTurkishSentence,
    userTranslation,
    setUserTranslation,
    aiResponse,
    loading,
    setLoading,
    filteredWords,
    categories,
    levels,
    selectedLevel,
    setSelectedLevel,
    selectedCategory,
    setSelectedCategory,
    userLevel,
    setUserLevel,
    handleGenerateSentence,
    handleCheckTranslation,
  };
}; 