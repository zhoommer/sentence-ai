"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { statisticsService } from "../services/statisticsService";
import { UserStatistics } from "../types";
import Card from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";

export const Statistics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const userStats = await statisticsService.getUserStatistics(user.uid);
        if (userStats) {
          setStats(userStats);
        } else {
          setError("İstatistikler yüklenemedi. Lütfen internet bağlantınızı kontrol edin.");
        }
      } catch (error) {
        console.error("İstatistikler yüklenirken hata:", error);
        setError("İstatistikler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

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

  if (!stats) {
    return (
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-blue-500">Henüz pratik kaydınız bulunmuyor. Pratik yapmaya başlayın!</p>
      </div>
    );
  }

  const successRate = stats.totalPractices > 0
    ? Math.round((stats.correctAnswers / stats.totalPractices) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm text-zinc-400 mb-1">Toplam Pratik</h3>
          <p className="text-2xl font-bold">{stats.totalPractices}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-zinc-400 mb-1">Doğru Cevap</h3>
          <p className="text-2xl font-bold text-green-500">{stats.correctAnswers}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-zinc-400 mb-1">Yanlış Cevap</h3>
          <p className="text-2xl font-bold text-red-500">{stats.wrongAnswers}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-zinc-400 mb-1">Başarı Oranı</h3>
          <p className="text-2xl font-bold text-blue-500">%{successRate}</p>
        </Card>
      </div>

      {/* Son Pratikler - Scrollable Bölüm */}
      {stats.practiceHistory.length > 0 && (
        <Card className="flex flex-col h-[500px]">
          <div className="p-4 border-b border-[#222]">
            <h3 className="text-lg font-semibold">Son Pratikler</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {stats.practiceHistory.slice().reverse().map((practice, index) => (
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
      )}
    </div>
  );
}; 