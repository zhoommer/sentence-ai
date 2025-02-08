"use client";

import { useWordPractice } from "../hooks/useWordPractice";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Card from "@/components/ui/card";
import { ChangeEvent, useState, useEffect } from "react";
import { UserLevel } from "../hooks/useWordPractice";
import { createTurkishSentence } from "@/lib/genkit";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { statisticsService } from "@/features/statistics/services/statisticsService";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { PLAN_FEATURES } from "@/features/subscription/types";
import { useRouter } from "next/navigation";

const userLevelOptions: { value: UserLevel; label: string }[] = [
  { value: "beginner", label: "Başlangıç" },
  { value: "intermediate", label: "Orta" },
  { value: "advanced", label: "İleri" },
];

export const WordPractice = () => {
  const { user } = useAuth();
  const {
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
  } = useWordPractice();

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctTranslation, setCorrectTranslation] = useState("");
  const { checkUsageLimit, getRemainingUsage, subscription } = useSubscription();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTranslationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserTranslation(e.target.value);
  };

  const handleLevelChange = (level: UserLevel) => {
    setUserLevel(level);
    if (selectedWord) {
      setTurkishSentence("");
      setUserTranslation("");
      setIsCorrect(null);
      setCorrectTranslation("");
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    // Kullanım limiti kontrolü
    const canProceed = await checkUsageLimit();
    if (!canProceed) {
      const remaining = getRemainingUsage();
      if (remaining === 0) {
        setError("Aylık pratik limitinize ulaştınız. Daha fazla pratik yapmak için planınızı yükseltin.");
        return;
      }
    }

    setLoading(true);
    try {
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

      const data = await response.json();
      const isAnswerCorrect = data.isCorrect;
      setIsCorrect(isAnswerCorrect);
      setCorrectTranslation(data.correctTranslation);

      // İstatistikleri kaydet
      try {
        await statisticsService.savePracticeResult(user.uid, {
          word: selectedWord,
          userLevel,
          isCorrect: isAnswerCorrect,
          turkishSentence,
          userTranslation,
          correctTranslation: data.correctTranslation,
        });

        // Streak'i güncelle
        await statisticsService.updateStreak(user.uid);

        console.log("İstatistikler başarıyla kaydedildi!");
      } catch (error) {
        console.error("İstatistik kaydı sırasında hata:", error);
      }
    } catch (error) {
      console.error("Çeviri kontrolü hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Hata mesajı */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          <div className="flex items-center justify-between">
            <p className="text-red-500">{error}</p>
            {subscription && subscription.plan !== "premium" && (
              <button
                onClick={() => router.push("/pricing")}
                className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Planı Yükselt
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Kelime Pratiği</h1>
          {/* Kalan kullanım hakkı göstergesi */}
          {subscription && subscription.plan !== "premium" && (
            <div className="p-2 bg-[#111] rounded-lg border border-[#222] text-sm text-zinc-400">
              Bu ay kalan pratik hakkınız:{" "}
              <span className="font-bold text-white">
                {getRemainingUsage()} / {PLAN_FEATURES[subscription.plan].practiceLimit}
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Kelime Ara</Label>
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Kelime ara..."
            />
          </div>
          <div>
            <Label>Seviye</Label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Seviye seç" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "all" ? "Tüm Seviyeler" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Kategori</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seç" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Tüm Kategoriler" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Kelime Listesi</h2>
          <div className="h-[400px] overflow-y-auto">
            {filteredWords.map((word) => (
              <button
                key={word.word}
                onClick={() => setSelectedWord(word.word)}
                className={`w-full text-left p-2 hover:bg-[#333] rounded ${
                  selectedWord === word.word ? "bg-[#333]" : ""
                }`}
              >
                {word.word}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Pratik</h2>
          {selectedWord && (
            <div>
              <p className="mb-2">
                <strong>Seçilen Kelime:</strong> {selectedWord}
              </p>
              {!turkishSentence && (
                <Button
                  onClick={handleGenerateSentence}
                  disabled={loading}
                >
                  {loading ? "Yükleniyor..." : "Cümle Oluştur"}
                </Button>
              )}

              {turkishSentence && (
                <div className="mb-4">
                  <p className="mb-2">
                    <strong>Türkçe Cümle:</strong>
                  </p>
                  <p className="p-2 bg-[#222] rounded">{turkishSentence}</p>
                </div>
              )}

              {turkishSentence && (
                <div className="mb-4">
                  <Label>İngilizce Çeviri</Label>
                  <Input
                    value={userTranslation}
                    onChange={handleTranslationChange}
                    placeholder="Çevirinizi yazın..."
                    className="mb-2"
                    disabled={loading}
                  />
                  <div className="flex gap-2">
                    {userTranslation.trim() !== "" && (
                      <Button
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? "Kontrol Ediliyor..." : "Kontrol Et"}
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        setTurkishSentence("");
                        setUserTranslation("");
                        setIsCorrect(null);
                        setCorrectTranslation("");
                        handleGenerateSentence();
                      }}
                      disabled={loading}
                      variant="secondary"
                    >
                      {loading ? "Yükleniyor..." : "Yeni Cümle"}
                    </Button>
                  </div>
                </div>
              )}

              {isCorrect !== null && (
                <div
                  className={`p-4 rounded-lg ${
                    isCorrect ? "bg-green-500/10" : "bg-red-500/10"
                  }`}
                >
                  {isCorrect ? "Doğru! 🎉" : "Yanlış. Doğru çeviri: " + correctTranslation}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}; 