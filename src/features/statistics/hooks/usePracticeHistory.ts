"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { statisticsService } from "../services/statisticsService";
import { UserStatistics } from "../types";

export const usePracticeHistory = () => {
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
          setError("Pratik geçmişi yüklenemedi. Lütfen internet bağlantınızı kontrol edin.");
        }
      } catch (error) {
        console.error("Pratik geçmişi yüklenirken hata:", error);
        setError("Pratik geçmişi yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

  return {
    practiceHistory: stats?.practiceHistory.slice().reverse() || [],
    loading,
    error,
    hasPractices: Boolean(stats?.practiceHistory.length)
  };
}; 