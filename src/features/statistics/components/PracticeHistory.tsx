"use client";

import { usePracticeHistory } from "../hooks/usePracticeHistory";
import Card from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";
import Input from "@/components/ui/input";
export const PracticeHistory = () => {
  const { practiceHistory, loading, error, hasPractices, handleSearch } = usePracticeHistory();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FaSpinner className="animate-spin text-2xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!hasPractices) {
    return (
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-blue-500">Henüz pratik kaydınız bulunmuyor. Pratik yapmaya başlayın!</p>
      </div>
    );
  }

  return (
    <Card className="flex flex-col h-[800px]">
      <div className="p-4 border-b border-[#222]">
        <h3 className="text-lg font-semibold">Pratik Geçmişi</h3>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Kelime ara..."
            className="w-full"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {practiceHistory.map((practice, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              practice.isCorrect ? "bg-green-500/10" : "bg-red-500/10"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium">{practice.word}</span>
                <span className="text-sm text-zinc-400 ml-2">
                  ({practice.userLevel})
                </span>
              </div>
              <span className="text-sm text-zinc-400">
                {new Date(practice.timestamp.seconds * 1000).toLocaleString("tr-TR")}
              </span>
            </div>
            <p className="text-sm text-zinc-300 mb-1">
              <strong>Türkçe:</strong> {practice.turkishSentence}
            </p>
            <p className="text-sm text-zinc-300">
              <strong>Çeviriniz:</strong> {practice.userTranslation}
            </p>
            {!practice.isCorrect && practice.correctTranslation && (
              <p className="text-sm text-zinc-300 mt-1">
                <strong>Doğru Çeviri:</strong> {practice.correctTranslation}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}; 