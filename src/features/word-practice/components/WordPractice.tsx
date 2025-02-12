"use client";

import { useWordPractice } from "../hooks/useWordPractice";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Card from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const WordPractice = () => {
  const {
    turkishSentence,
    isCorrect,
    correctTranslation,
    loading,
    error,
    selectedWord,
    userTranslation,
    selectedLevel,
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
  } = useWordPractice();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return selectedLevel === level
          ? "bg-green-600 hover:bg-green-700"
          : "border-green-600/20 hover:border-green-600/40";
      case "intermediate":
        return selectedLevel === level
          ? "bg-yellow-600 hover:bg-yellow-700"
          : "border-yellow-600/20 hover:border-yellow-600/40";
      case "advanced":
        return selectedLevel === level
          ? "bg-red-600 hover:bg-red-700"
          : "border-red-600/20 hover:border-red-600/40";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Kelime Seçimi</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2  w-max relative">
              Zorluk Seviyesi
              <span className="relative group -top-2 right-2">
                <AiOutlineInfoCircle className="inline-block ml-2 text-gray-500 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Yapay zeka, seçtiğiniz zorluk seviyesine uygun olarak sizin
                  için cümleler oluşturur.
                </span>
              </span>
            </label>
            <div className="flex gap-2">
              {[
                { id: "beginner", label: "Kolay" },
                { id: "intermediate", label: "Orta" },
                { id: "advanced", label: "Zor" },
              ].map((level) => (
                <Button
                  key={level.id}
                  variant={selectedLevel === level.id ? "primary" : "outline"}
                  onClick={() =>
                    setSelectedLevel(
                      level.id as "beginner" | "intermediate" | "advanced",
                    )
                  }
                  className={`flex-1 ${getLevelColor(level.id)}`}
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Kelime Ara
              </label>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Kelime ara..."
              />
            </div>

            <div className="w-full md:w-48">
              <label className="block text-sm font-medium mb-2">Seviye</label>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Seviye seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>Tümü</SelectItem>
                  {levels.map((level, index) => (
                    <SelectItem key={index} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label className="block text-sm font-medium mb-2">Kategori</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seç" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "Tümü" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto border border-zinc-800 rounded-lg p-4 custom-scrollbar">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedWord(word.word);
                    generateSentence(word.word);
                  }}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    selectedWord === word.word
                      ? "bg-blue-600 text-white"
                      : "bg-[#222] hover:bg-[#333] text-zinc-300"
                  }`}
                >
                  {word.word}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Cümle Oluşturma ve Çeviri */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Cümle Pratiği</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {selectedWord && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Türkçe Cümle
              </label>
              <p className="p-3 bg-[#222] rounded-lg">
                {turkishSentence || "Cümle oluşturuluyor..."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                İngilizce Çeviri
              </label>
              <Input
                value={userTranslation}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUserTranslation(e.target.value)
                }
                placeholder="Çevirinizi buraya yazın..."
                disabled={loading || !turkishSentence}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={checkTranslation}
                disabled={loading || !turkishSentence || !userTranslation}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Kontrol Ediliyor</span>
                  </>
                ) : (
                  "Çeviriyi Kontrol Et"
                )}
              </Button>

              {isCorrect !== null && (
                <Button
                  onClick={() => {
                    resetStates();
                    generateSentence(selectedWord);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Yeni Cümle
                </Button>
              )}
            </div>

            {isCorrect !== null && (
              <div
                className={`p-4 rounded-lg ${isCorrect ? "bg-green-100" : "bg-red-100"}`}
              >
                {isCorrect ? (
                  <p className="text-green-700">Tebrikler! Çeviriniz doğru.</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-red-700">Üzgünüm, çeviriniz yanlış.</p>
                    <p className="text-gray-700">
                      Doğru çeviri: {correctTranslation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
