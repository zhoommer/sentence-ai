export type SubscriptionPlan = "free" | "basic" | "premium";

export interface PlanLimits {
  plan: SubscriptionPlan;
  description: string;
  price: number;
  practiceLimit: number; // -1 for unlimited
  features: string[];
}

export interface SubscriptionDetails {
  plan: SubscriptionPlan;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  currentUsage: number;
  lastResetDate: Date;
}

export const PLAN_FEATURES: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    plan: "free",
    description: "İngilizce öğrenmeye başlamak için ideal",
    price: 0,
    practiceLimit: 50,
    features: [
      "Aylık 50 pratik hakkı",
      "Temel kelime ve cümle pratiği",
      "Basit seviye çeviriler",
      "Sınırlı AI destekli öğrenme",
    ],
  },
  basic: {
    plan: "basic",
    description: "Daha fazla pratik, daha hızlı öğrenme",
    price: 199.99,
    practiceLimit: 200,
    features: [
      "Aylık 200 pratik hakkı",
      "Gelişmiş kelime ve cümle pratiği",
      "Orta-ileri seviye çeviriler",
      "Tam AI destekli öğrenme",
      "Özelleştirilmiş öğrenme planı",
      "İlerleme analizi",
    ],
  },
  premium: {
    plan: "premium",
    description: "Sınırsız pratik, maksimum verim",
    price: 499.99,
    practiceLimit: -1, // Sınırsız
    features: [
      "Sınırsız pratik hakkı",
      "Tüm seviyelerde pratik",
      "Profesyonel seviye çeviriler",
      "Premium AI destekli öğrenme",
      "Kişiselleştirilmiş öğrenme planı",
      "Detaylı ilerleme analizi",
      "Öncelikli destek",
      "Reklamsız deneyim",
    ],
  },
};
