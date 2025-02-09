"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { PLAN_FEATURES } from "../types";
import Button from "@/components/ui/button";
import { AiOutlineCheck } from "react-icons/ai";

const PLAN_PRICES = {
  free: 0,
  basic: 49.99,
  premium: 99.99,
};

export const PricingPlans = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleSelectPlan = (plan: string) => {
    if (!user) {
      router.push("/register");
      return;
    }

    if (plan === "free") {
      router.push("/practice");
      return;
    }

    // TODO: Ödeme sayfasına yönlendir
    console.log("Plan seçildi:", plan);
  };

  return (
    <div className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Size Uygun Planı Seçin</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Her seviyeye uygun planlarımızla İngilizce öğrenme yolculuğunuzda
            yanınızdayız. İhtiyacınıza en uygun planı seçin ve hemen öğrenmeye
            başlayın.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Ücretsiz Plan */}
          <div className="bg-[#111] p-8 rounded-2xl border border-[#222] hover:border-[#333] transition-colors">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Ücretsiz</h3>
              <p className="text-zinc-400 mb-4">
                İngilizce öğrenmeye başlamak için ideal
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">₺{PLAN_PRICES.free}</span>
                <span className="text-zinc-400">/ay</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {PLAN_FEATURES.free.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <AiOutlineCheck className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleSelectPlan("free")}
              className="w-full"
              variant="outline"
            >
              {user ? "Pratik Yap" : "Ücretsiz Başla"}
            </Button>
          </div>

          {/* Basic Plan */}
          <div className="bg-[#111] p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/30 transition-colors relative">
            {/* Popüler Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                En Popüler
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-zinc-400 mb-4">
                Daha fazla pratik, daha hızlı öğrenme
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">₺{PLAN_PRICES.basic}</span>
                <span className="text-zinc-400">/ay</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {PLAN_FEATURES.basic.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <AiOutlineCheck className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleSelectPlan("basic")}
              className="w-full"
            >
              Planı Seç
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-[#111] p-8 rounded-2xl border border-[#222] hover:border-[#333] transition-colors">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-zinc-400 mb-4">
                Sınırsız pratik, maksimum verim
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">
                  ₺{PLAN_PRICES.premium}
                </span>
                <span className="text-zinc-400">/ay</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {PLAN_FEATURES.premium.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <AiOutlineCheck className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleSelectPlan("premium")}
              className="w-full"
              variant="outline"
            >
              Planı Seç
            </Button>
          </div>
        </div>

        {/* SSS */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Sıkça Sorulan Sorular
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-2">
                Ücretsiz plan ne kadar süre geçerli?
              </h4>
              <p className="text-zinc-400">
                Ücretsiz plan süresiz olarak geçerlidir. Aylık 50 pratik
                hakkınızı dilediğiniz gibi kullanabilirsiniz.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">
                Planımı istediğim zaman değiştirebilir miyim?
              </h4>
              <p className="text-zinc-400">
                Evet, planınızı istediğiniz zaman yükseltebilir veya
                düşürebilirsiniz.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">
                Ödeme yaparken hangi yöntemleri kullanabilirim?
              </h4>
              <p className="text-zinc-400">
                Kredi kartı, banka kartı ve diğer popüler ödeme yöntemlerini
                kullanabilirsiniz.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">İade politikanız nedir?</h4>
              <p className="text-zinc-400">
                İlk 14 gün içinde herhangi bir sebep belirtmeden iade talep
                edebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

