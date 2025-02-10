"use client";

import { useStatistics } from "../hooks/useStatistics";
import Card from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";

export const Statistics = () => {
  const { stats, loading, error, getSuccessRate } = useStatistics();

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
        <p className="text-blue-500">
          Henüz pratik kaydınız bulunmuyor. Pratik yapmaya başlayın!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:border-zinc-400/40">
          <h3 className="text-sm text-zinc-400 mb-1">Toplam Pratik</h3>
          <p className="text-2xl font-bold">{stats.totalPractices}</p>
        </Card>

        <Card className="p-4 hover:border-green-500/40">
          <h3 className="text-sm text-zinc-400 mb-1">Doğru Cevap</h3>
          <p className="text-2xl font-bold text-green-500">
            {stats.correctAnswers}
          </p>
        </Card>

        <Card className="p-4 hover:border-red-500/40">
          <h3 className="text-sm text-zinc-400 mb-1">Yanlış Cevap</h3>
          <p className="text-2xl font-bold text-red-500">
            {stats.wrongAnswers}
          </p>
        </Card>

        <Card className="p-4 hover:border-blue-500/40">
          <h3 className="text-sm text-zinc-400 mb-1">Başarı Oranı</h3>
          <p className="text-2xl font-bold text-blue-500">
            %{getSuccessRate()}
          </p>
        </Card>
      </div>
    </div>
  );
};
