"use client";

import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { useRouter } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { PricingPlans } from "@/features/subscription/components/PricingPlans";
import HowItsWork from "@/common/howItsWork";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  const handleGetStarted = () => {
    if (user) {
      router.push("/practice");
    } else {
      router.push("/register");
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            İngilizce Öğrenmenin En Akıllı Yolu
          </h1>
          <p className="text-lg text-zinc-400 mb-8">
            Yapay zeka destekli alıştırmalarla İngilizce kelime dağarcığınızı
            geliştirin ve çeviri yeteneklerinizi güçlendirin.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-400 hover:animate-pulse text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            {user ? "Pratiğe Başla" : "Hemen Başla"}
            <AiOutlineArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <HowItsWork />
      </section>

      {/* Fiyatlandırma Planları */}
      <PricingPlans />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Hemen Pratiğe Başlayın</h2>
          <p className="text-lg text-zinc-400 mb-8">
            İngilizce öğrenme yolculuğunuzda size yardımcı olmak için buradayız.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            {user ? "Kelime Pratiğine Başla" : "Hesap Oluştur"}
            <AiOutlineArrowRight size={20} />
          </button>
        </div>
      </section>
    </main>
  );
}
