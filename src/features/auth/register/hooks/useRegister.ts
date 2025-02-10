"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerService } from "../services/registerService";
import { profileService } from "@/features/profile/services/profileService";
import Cookies from "js-cookie";

export const useRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.terms) {
      setError("Kullanım şartlarını kabul etmelisiniz");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return false;
    }

    if (!formData.name.trim()) {
      setError("Ad Soyad alanı zorunludur");
      return false;
    }

    return true;
  };

  const registerWithEmail = async () => {
    try {
      setLoading(true);
      setError("");

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const result = await registerService.registerWithEmail(
        formData.email,
        formData.password,
      );
      const token = await registerService.getToken(result.user);

      // Kullanıcı profilini oluştur
      await profileService.createUserProfile(
        result.user.uid,
        formData.email,
        formData.name,
      );

      Cookies.set("token", token, { expires: 7 });
      router.refresh();
      router.push("/dashboard");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Bu email adresi zaten kullanımda");
          break;
        case "auth/invalid-email":
          setError("Geçersiz email adresi");
          break;
        default:
          setError("Kayıt işlemi başarısız oldu");
      }
    } finally {
      setLoading(false);
    }
  };

  const registerWithGoogle = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await registerService.registerWithGoogle();
      const token = await registerService.getToken(result.user);

      // Google ile giriş yapan kullanıcının profilini oluştur
      if (result.user.displayName) {
        await profileService.createUserProfile(
          result.user.uid,
          result.user.email!,
          result.user.displayName,
        );
      }

      Cookies.set("token", token, { expires: 7 });
      router.refresh();
      router.push("/dashboard");
    } catch (error: any) {
      setError("Google ile kayıt başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    registerWithEmail,
    registerWithGoogle,
  };
};

