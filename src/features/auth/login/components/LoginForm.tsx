"use client";

import Link from "next/link";
import { AiOutlineMail, AiOutlineLock, AiOutlineLogin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const {
    formData,
    error,
    loading,
    handleChange,
    loginWithEmail,
    loginWithGoogle,
  } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithEmail();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent]">
      {/* Logo ve Başlık */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-2">
          Sentese AI
        </h1>
        <p className="text-zinc-400">
          Yapay zeka destekli İngilizce öğrenme platformu
        </p>
      </div>

      <div className="w-full max-w-md">
        {/* Giriş Kartı */}
        <div className="bg-[#000]/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Hoş Geldiniz</h2>
            <p className="text-zinc-400 text-sm mt-1">Hesabınıza giriş yapın</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AiOutlineMail className="text-zinc-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email adresinizi giriniz"
                  className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[#222] focus:border-blue-500 rounded-xl text-white placeholder:text-zinc-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AiOutlineLock className="text-zinc-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Şifrenizi giriniz"
                  className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[#222] focus:border-blue-500 rounded-xl text-white placeholder:text-zinc-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Beni Hatırla & Şifremi Unuttum */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-[#0a0a0a] border-[#222] text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-zinc-400">Beni hatırla</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Şifremi unuttum
              </Link>
            </div>

            {/* Giriş Butonu */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              <AiOutlineLogin size={20} />
            </button>

            {/* Ayraç */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#222]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#111] text-zinc-400">veya</span>
              </div>
            </div>

            {/* Google ile Giriş */}
            <button
              type="button"
              onClick={loginWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0a0a0a] hover:bg-[#151515] text-white border border-[#222] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle size={20} />
              Google ile giriş yap
            </button>
          </form>
        </div>

        {/* Kayıt Ol Linki */}
        <p className="text-center text-zinc-400 text-sm mt-8">
          Hesabınız yok mu?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
          >
            Hemen kayıt olun
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 