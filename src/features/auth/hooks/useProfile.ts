import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { userService } from "../services/userService";
import { UserProfile } from "../types";

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const userProfile = await userService.getUserProfile(user.uid);
        setProfile(userProfile);
      } catch (error) {
        console.error("Profil yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  return { profile, loading };
}; 