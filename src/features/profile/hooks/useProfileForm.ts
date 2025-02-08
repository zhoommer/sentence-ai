import { useState } from "react";
import { useAuth } from "@/lib/firebase/hooks/useAuth";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { userService } from "@/features/auth/services/userService";

export const useProfileForm = () => {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = async (displayName: string) => {
    if (!user) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await userService.updateUserProfile(user.uid, {
        displayName,
      });
      setSuccess(true);
    } catch (error) {
      console.error("Profil güncellenirken hata:", error);
      setError("Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading: loading || profileLoading,
    error,
    success,
    updateProfile,
  };
}; 