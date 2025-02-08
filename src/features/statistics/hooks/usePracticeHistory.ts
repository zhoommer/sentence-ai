"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { statisticsService } from "../services/statisticsService";
import { UserStatistics, PracticeRecord } from "../types";

export const usePracticeHistory = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistory, setFilteredHistory] = useState<PracticeRecord[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const userStats = await statisticsService.getUserStatistics(user.uid);
        if (userStats) {
          setStats(userStats);
          setFilteredHistory(userStats.practiceHistory.slice().reverse());
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

  // Arama fonksiyonu
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!stats) return;

    const filtered = stats.practiceHistory
      .slice()
      .reverse()
      .filter(practice => 
        practice.word.toLowerCase().includes(term.toLowerCase())
      );
    
    setFilteredHistory(filtered);
  };

  return {
    practiceHistory: filteredHistory,
    loading,
    error,
    hasPractices: Boolean(stats?.practiceHistory.length),
    searchTerm,
    handleSearch
  };
}; 