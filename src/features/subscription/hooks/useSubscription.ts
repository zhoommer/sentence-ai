import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { subscriptionService } from "../services/subscriptionService";
import { SubscriptionDetails, PLAN_FEATURES } from "../types";

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubscription = async () => {
      if (!user) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      try {
        const details = await subscriptionService.getSubscriptionDetails(user.uid);
        setSubscription(details);
      } catch (error) {
        console.error("Üyelik bilgileri yüklenirken hata:", error);
        setError("Üyelik bilgileri yüklenemedi");
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, [user]);

  const checkUsageLimit = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      return await subscriptionService.incrementUsageAndCheckLimit(user.uid);
    } catch (error) {
      console.error("Kullanım limiti kontrolü sırasında hata:", error);
      return false;
    }
  };

  const getRemainingUsage = (): number | null => {
    if (!subscription) return null;

    const planLimit = PLAN_FEATURES[subscription.plan].practiceLimit;
    if (planLimit === -1) return -1; // Sınırsız
    return planLimit - subscription.currentUsage;
  };

  const upgradePlan = async (newPlan: "basic" | "premium") => {
    if (!user) return;

    try {
      await subscriptionService.upgradePlan(user.uid, newPlan);
      const details = await subscriptionService.getSubscriptionDetails(user.uid);
      setSubscription(details);
    } catch (error) {
      console.error("Plan yükseltme sırasında hata:", error);
      throw error;
    }
  };

  return {
    subscription,
    loading,
    error,
    checkUsageLimit,
    getRemainingUsage,
    upgradePlan,
  };
}; 