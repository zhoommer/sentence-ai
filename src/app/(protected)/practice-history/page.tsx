"use client";

import { PracticeHistory } from "@/features/statistics/components/PracticeHistory";

export default function PracticeHistoryPage() {
  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pratik Geçmişi</h1>
        <p className="text-zinc-400">
          Tüm pratik çalışmalarınızın detaylı geçmişi
        </p>
      </div>

      <PracticeHistory />
    </div>
  );
} 