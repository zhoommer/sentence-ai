"use client";

import Faq from "./Faq";
import { questions } from "../utils/questions";
import Plans from "./Plans";

export const PricingPlans = () => {
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
          <Plans plan="Ücretsiz" />

          {/* Basic Plan */}
          <Plans plan="Basic" />

          {/* Premium Plan */}
          <Plans plan="Premium" />
        </div>

        {/* SSS */}
        <Faq questions={questions} />
      </div>
    </div>
  );
};
