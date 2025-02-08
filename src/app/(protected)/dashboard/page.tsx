"use client";

import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { useRouter } from "next/navigation";
import { AiOutlineBook, AiOutlineHistory, AiOutlineRise } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { Statistics } from "@/features/statistics/components/Statistics";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const router = useRouter();

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Hoş Geldin Mesajı */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">
          Hoş Geldin, {profile?.displayName || user?.email?.split("@")[0]}!
        </h1>
        <p className="text-zinc-400">
          İngilizce öğrenme yolculuğunda bugün neler yapmak istersin?
        </p>
      </div>

      {/* Ana Kartlar */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Kelime Pratiği Kartı */}
        <div
          onClick={() => router.push("/practice")}
          className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors cursor-pointer group"
        >
          <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
            <AiOutlineBook className="text-2xl text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Kelime Pratiği</h3>
          <p className="text-zinc-400">
            AI destekli çeviri alıştırmaları ile kelime dağarcığınızı geliştirin.
          </p>
        </div>

        {/* İlerleme Kartı */}
        <div className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600/20 transition-colors">
            <AiOutlineRise className="text-2xl text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">İlerleme Durumu</h3>
          <p className="text-zinc-400">
            Öğrenme istatistiklerinizi ve başarı grafiklerinizi görüntüleyin.
          </p>
        </div>

        {/* Geçmiş Kartı */}
        <div
          onClick={() => router.push("/practice-history")}
          className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors cursor-pointer group"
        >
          <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-colors">
            <AiOutlineHistory className="text-2xl text-purple-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Pratik Geçmişi</h3>
          <p className="text-zinc-400">
            Geçmiş alıştırmalarınızı ve performansınızı inceleyin.
          </p>
        </div>
      </div>

      {/* İstatistikler */}
      <Statistics />
    </div>
  );
} 