import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { UserProfile } from "@/features/profile/types";

export const profileService = {
  // Kullanıcı profilini getir
  getUserProfile: async (uid: string): Promise<UserProfile | null> => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }

      return null;
    } catch (error) {
      console.error("Kullanıcı profili getirilirken hata:", error);
      return null;
    }
  },

  // Yeni kullanıcı profili oluştur
  createUserProfile: async (
    uid: string,
    email: string,
    displayName: string,
  ): Promise<void> => {
    try {
      const docRef = doc(db, "users", uid);
      const now = Timestamp.now();

      const userData: UserProfile = {
        uid,
        email,
        displayName,
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
      };

      await setDoc(docRef, userData);
    } catch (error) {
      console.error("Kullanıcı profili oluşturulurken hata:", error);
      throw error;
    }
  },

  // Kullanıcı profilini güncelle
  updateUserProfile: async (
    uid: string,
    data: Partial<UserProfile>,
  ): Promise<void> => {
    try {
      const docRef = doc(db, "users", uid);
      const now = Timestamp.now();

      await updateDoc(docRef, {
        ...data,
        updatedAt: now.toDate(),
      });
    } catch (error) {
      console.error("Kullanıcı profili güncellenirken hata:", error);
      throw error;
    }
  },
};
