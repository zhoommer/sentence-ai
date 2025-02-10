import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { UserStatistics, PracticeRecord } from "../types";

const isOnline = () => {
  return window.navigator.onLine;
};

export const statisticsService = {
  // Kullanıcı istatistiklerini getir
  getUserStatistics: async (userId: string): Promise<UserStatistics | null> => {
    try {
      if (!isOnline()) {
        console.warn(
          "İnternet bağlantısı yok, çevrimdışı veriler kullanılıyor",
        );
      }

      const docRef = doc(db, "userStatistics", userId);
      console.log("Document referansı oluşturuldu:", docRef.path);

      const docSnap = await getDoc(docRef);
      console.log("Document snapshot alındı, exists:", docSnap.exists());

      if (docSnap.exists()) {
        return docSnap.data() as UserStatistics;
      }

      // Kullanıcı istatistikleri yoksa yeni oluştur
      const initialStats: UserStatistics = {
        totalPractices: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        lastPracticeDate: Timestamp.fromDate(new Date()),
        practiceStreak: 0,
        learnedWords: [],
        practiceHistory: [],
      };

      try {
        await setDoc(docRef, initialStats);
        console.log("Yeni istatistik belgesi oluşturuldu");
        return initialStats;
      } catch (error) {
        console.error("Yeni istatistik belgesi oluşturulamadı:", error);
        return initialStats;
      }
    } catch (error: any) {
      if (
        error?.code === "failed-precondition" ||
        error?.code === "unavailable"
      ) {
        console.warn("Çevrimdışı mod aktif değil veya bağlantı hatası");
      }
      throw error;
    }
  },

  // Pratik sonucunu kaydet
  savePracticeResult: async (
    userId: string,
    practiceRecord: Omit<PracticeRecord, "timestamp">,
  ) => {
    console.log("savePracticeResult başladı:", { userId, practiceRecord });

    if (!isOnline()) {
      console.warn("İnternet bağlantısı yok!");
      throw new Error("İnternet bağlantısı yok");
    }

    try {
      const docRef = doc(db, "userStatistics", userId);
      console.log("Document referansı oluşturuldu:", docRef.path);

      const docSnap = await getDoc(docRef);
      console.log("Document snapshot alındı, exists:", docSnap.exists());

      const record: PracticeRecord = {
        ...practiceRecord,
        timestamp: Timestamp.fromDate(new Date()),
      };

      if (docSnap.exists()) {
        console.log("Mevcut istatistikler güncelleniyor");
        // İstatistikleri güncelle
        await updateDoc(docRef, {
          totalPractices: increment(1),
          [practiceRecord.isCorrect ? "correctAnswers" : "wrongAnswers"]:
            increment(1),
          lastPracticeDate: Timestamp.fromDate(new Date()),
          practiceHistory: arrayUnion(record),
          ...(practiceRecord.isCorrect && {
            learnedWords: arrayUnion(practiceRecord.word),
          }),
        });
        console.log("İstatistikler başarıyla güncellendi");
      } else {
        console.log("Yeni istatistik belgesi oluşturuluyor");
        // Yeni istatistik belgesi oluştur
        const initialStats: UserStatistics = {
          totalPractices: 1,
          correctAnswers: practiceRecord.isCorrect ? 1 : 0,
          wrongAnswers: practiceRecord.isCorrect ? 0 : 1,
          lastPracticeDate: Timestamp.fromDate(new Date()),
          practiceStreak: 1,
          learnedWords: practiceRecord.isCorrect ? [practiceRecord.word] : [],
          practiceHistory: [record],
        };
        await setDoc(docRef, initialStats);
        console.log("Yeni istatistik belgesi başarıyla oluşturuldu");
      }
    } catch (error) {
      console.error("Pratik sonucu kaydedilirken hata:", error);
      // Hata detaylarını logla
      if (error instanceof Error) {
        console.error("Hata detayları:", {
          message: error.message,
          name: error.name,
          stack: error.stack,
        });
      }
      throw error;
    }
  },

  // Streak'i güncelle
  updateStreak: async (userId: string) => {
    if (!isOnline()) {
      throw new Error("İnternet bağlantısı yok");
    }

    try {
      const docRef = doc(db, "userStatistics", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as UserStatistics;
        const lastPractice = data.lastPracticeDate;
        const today = new Date();
        const diffDays = Math.floor(
          (today.getTime() - lastPractice.toDate().getTime()) /
            (1000 * 60 * 60 * 24),
        );

        let newStreak = data.practiceStreak;
        if (diffDays === 1) {
          // Ardışık gün
          newStreak += 1;
        } else if (diffDays > 1) {
          // Streak kırıldı
          newStreak = 1;
        }

        await updateDoc(docRef, {
          practiceStreak: newStreak,
        });
      }
    } catch (error) {
      console.error("Streak güncellenirken hata:", error);
      throw error;
    }
  },
};

