"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { statisticsService } from "../services/statisticsService";
import { UserStatistics } from "../types";

export const useStatistics = () => {
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

  const getSuccessRate = () => {
    if (!stats) return 0;
    return stats.totalPractices > 0
      ? Math.round((stats.correctAnswers / stats.totalPractices) * 100)
      : 0;
  };

  return {
    stats,
    loading,
    error,
    getSuccessRate,
  };
}; 