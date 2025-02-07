"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineLock, AiOutlineLogin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle } = useLogin();

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
      await loginWithGoogle(formData.remember);
      router.refresh();
      router.push("/");
    } catch (error: any) {
      setError("Google ile giriş başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginWithEmail(formData.email, formData.password, formData.remember);
      router.refresh();
      router.push("/");
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
        <div className="auth-container">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Hoş Geldiniz</h1>
            <p className="text-zinc-400 text-sm">Hesabınıza giriş yapın</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-4">
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
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember" className="ml-2 text-zinc-400">
                Beni hatırla
              </label>
            </div>
            <Link href="/forgot-password" className="text-blue-500 hover:text-blue-400">
              Şifremi unuttum
            </Link>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              <AiOutlineLogin size={20} />
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
              Google ile giriş yap
            </button>
          </div>

          <p className="text-center text-zinc-400 text-sm">
            Hesabınız yok mu?{" "}
            <Link href="/register" className="text-blue-500 hover:text-blue-400">
              Kayıt olun
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 