"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "../hooks/useRegister";

const RegisterForm = () => {
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
  const { registerWithEmail, registerWithGoogle } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await registerWithGoogle();
      router.refresh();
      router.push("/");
    } catch (error: any) {
      setError("Google ile kayıt başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Form validasyonları
    if (!formData.terms) {
      setError("Kullanım şartlarını kabul etmelisiniz");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      setLoading(false);
      return;
    }

    try {
      await registerWithEmail(formData.email, formData.password);
      router.refresh();
      router.push("/");
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
        <div className="auth-container">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Kayıt Ol</h1>
            <p className="text-zinc-400 text-sm">Yeni bir hesap oluşturun</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <AiOutlineUser
                size={20}
                className="absolute top-3 left-3 text-zinc-400"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ad Soyad"
                autoComplete="name"
              />
            </div>

            <div className="relative">
              <AiOutlineMail
                size={20}
                className="absolute top-3 left-3 text-zinc-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email adresinizi giriniz"
                autoComplete="email"
                required
              />
            </div>

            <div className="relative">
              <AiOutlineLock
                size={20}
                className="absolute top-3 left-3 text-zinc-400"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Şifrenizi giriniz"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="relative">
              <AiOutlineLock
                size={20}
                className="absolute top-3 left-3 text-zinc-400"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Şifrenizi tekrar giriniz"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="ml-2 text-zinc-400">
              <span>
                <Link href="/terms" className="text-blue-500 hover:text-blue-400">
                  Kullanım şartlarını
                </Link>{" "}
                kabul ediyorum
              </span>
            </label>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
              <AiOutlineUser size={20} />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/20 text-zinc-400">veya</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#222] hover:bg-[#333] text-white border border-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle size={20} />
              Google ile kayıt ol
            </button>
          </div>

          <p className="text-center text-zinc-400 text-sm">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-400">
              Giriş yapın
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 