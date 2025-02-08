"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
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

  const loginWithEmail = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const token = await result.user.getIdToken();
      Cookies.set("token", token, { expires: formData.remember ? 7 : 1 });
      router.refresh();
      router.push("/dashboard");
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Geçersiz email adresi");
          break;
        case "auth/user-disabled":
          setError("Bu hesap devre dışı bırakılmış");
          break;
        case "auth/user-not-found":
          setError("Bu email adresi ile kayıtlı kullanıcı bulunamadı");
          break;
        case "auth/wrong-password":
          setError("Hatalı şifre");
          break;
        default:
          setError("Giriş işlemi başarısız oldu");
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      Cookies.set("token", token, { expires: formData.remember ? 7 : 1 });
      router.refresh();
      router.push("/dashboard");
    } catch (error: any) {
      setError("Google ile giriş başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    loginWithEmail,
    loginWithGoogle,
  };
}; 