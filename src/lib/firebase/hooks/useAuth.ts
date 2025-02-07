import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { User, signOut as firebaseSignOut } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  return {
    user,
    loading,
    signOut,
  };
}; 