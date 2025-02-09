export type SubscriptionPlan = "free" | "basic" | "premium";

export interface PlanLimits {
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
    practiceLimit: 50,
    features: [
      "Aylık 50 pratik hakkı",
      "Temel kelime ve cümle pratiği",
      "Basit seviye çeviriler",
      "Sınırlı AI destekli öğrenme",
    ],
  },
  basic: {
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

