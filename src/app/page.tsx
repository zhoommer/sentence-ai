"use client";

import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { useRouter } from "next/navigation";
import { AiOutlineBook, AiOutlineTranslation, AiOutlineRobot, AiOutlineArrowRight } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { PricingPlans } from "@/features/subscription/components/PricingPlans";

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
            Yapay zeka destekli alıştırmalarla İngilizce kelime dağarcığınızı geliştirin ve çeviri yeteneklerinizi güçlendirin.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            {user ? "Pratiğe Başla" : "Hemen Başla"}
            <AiOutlineArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nasıl Çalışır?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Özellik 1 */}
            <div className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4">
                <AiOutlineBook className="text-2xl text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Kelime Seçimi</h3>
              <p className="text-zinc-400">
                1000+ İngilizce kelime arasından pratik yapmak istediğiniz kelimeyi seçin.
              </p>
            </div>

            {/* Özellik 2 */}
            <div className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors">
              <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center mb-4">
                <AiOutlineRobot className="text-2xl text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Cümle Üretimi</h3>
              <p className="text-zinc-400">
                Yapay zeka seçtiğiniz kelimeyi kullanarak Türkçe bir cümle oluşturur.
              </p>
            </div>

            {/* Özellik 3 */}
            <div className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-colors">
              <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center mb-4">
                <AiOutlineTranslation className="text-2xl text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Çeviri Pratiği</h3>
              <p className="text-zinc-400">
                Oluşturulan cümleyi İngilizce'ye çevirin ve AI'dan anında geri bildirim alın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fiyatlandırma Planları */}
      <PricingPlans />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Hemen Pratiğe Başlayın
          </h2>
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
