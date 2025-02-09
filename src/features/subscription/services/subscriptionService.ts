import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { SubscriptionDetails, SubscriptionPlan, PLAN_FEATURES } from "../types";

export const subscriptionService = {
  // Üyelik detaylarını getir
  getSubscriptionDetails: async (
    userId: string,
  ): Promise<SubscriptionDetails | null> => {
    try {
      const docRef = doc(db, "subscriptions", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        return {
          ...data,
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
          lastResetDate: data.lastResetDate.toDate(),
        } as SubscriptionDetails;
      }

      // Üyelik yoksa ücretsiz plan oluştur
      const now = new Date();
      const freeSubscription: SubscriptionDetails = {
        plan: "free",
        startDate: now,
        endDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()), // 1 yıl geçerli
        isActive: true,
        currentUsage: 0,
        lastResetDate: now,
      };

      await setDoc(docRef, {
        ...freeSubscription,
        startDate: Timestamp.fromDate(freeSubscription.startDate!),
        endDate: Timestamp.fromDate(freeSubscription.endDate!),
        lastResetDate: Timestamp.fromDate(freeSubscription.lastResetDate!),
      });

      return freeSubscription;
    } catch (error) {
      console.error("Üyelik detayları getirilirken hata:", error);
      return null;
    }
  },

  // Kullanım sayısını artır ve limit kontrolü yap
  incrementUsageAndCheckLimit: async (userId: string): Promise<boolean> => {
    try {
      const subscription =
        await subscriptionService.getSubscriptionDetails(userId);
      if (!subscription) return false;

      // Premium plan için limit kontrolü yok
      if (subscription.plan === "premium") return true;

      // Ay değiştiyse kullanımı sıfırla
      const now = new Date();
      const lastReset = subscription.lastResetDate;
      const shouldReset =
        now.getMonth() !== lastReset.getMonth() ||
        now.getFullYear() !== lastReset.getFullYear();

      const docRef = doc(db, "subscriptions", userId);
      if (shouldReset) {
        await updateDoc(docRef, {
          currentUsage: 1,
          lastResetDate: Timestamp.fromDate(now),
        });
        return true;
      }

      // Limit kontrolü
      const planLimit = PLAN_FEATURES[subscription.plan].practiceLimit;
      if (subscription.currentUsage >= planLimit) {
        return false;
      }

      // Kullanımı artır
      await updateDoc(docRef, {
        currentUsage: subscription.currentUsage + 1,
      });

      return true;
    } catch (error) {
      console.error("Kullanım kontrolü sırasında hata:", error);
      return false;
    }
  },

  // Plan yükseltme
  upgradePlan: async (
    userId: string,
    newPlan: SubscriptionPlan,
  ): Promise<void> => {
    try {
      const docRef = doc(db, "subscriptions", userId);
      const now = new Date();

      await updateDoc(docRef, {
        plan: newPlan,
        startDate: Timestamp.fromDate(now),
        endDate: Timestamp.fromDate(
          new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
        ),
        isActive: true,
      });
    } catch (error) {
      console.error("Plan yükseltme sırasında hata:", error);
      throw error;
    }
  },
};
