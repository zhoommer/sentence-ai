"use client";

import Link from "next/link";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "../hooks/useRegister";

const RegisterForm = () => {
  const {
    formData,
    error,
    loading,
    handleChange,
    registerWithEmail,
    registerWithGoogle,
  } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerWithEmail();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
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
        {/* Kayıt Kartı */}
        <div className="bg-[#000]/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Kayıt Ol</h2>
            <p className="text-zinc-400 text-sm mt-1">Yeni bir hesap oluşturun</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ad Soyad */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AiOutlineUser className="text-zinc-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ad Soyad"
                  className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[#222] focus:border-blue-500 rounded-xl text-white placeholder:text-zinc-500 transition-colors"
                />
              </div>
            </div>

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

            {/* Şifre Tekrar */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AiOutlineLock className="text-zinc-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Şifrenizi tekrar giriniz"
                  className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[#222] focus:border-blue-500 rounded-xl text-white placeholder:text-zinc-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Kullanım Şartları */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="w-4 h-4 rounded bg-[#0a0a0a] border-[#222] text-blue-500 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-zinc-400">
                <span>
                  <Link
                    href="/terms"
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    Kullanım şartlarını
                  </Link>{" "}
                  kabul ediyorum
                </span>
              </label>
            </div>

            {/* Kayıt Ol Butonu */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
              <AiOutlineUser size={20} />
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

            {/* Google ile Kayıt */}
            <button
              type="button"
              onClick={registerWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0a0a0a] hover:bg-[#151515] text-white border border-[#222] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle size={20} />
              Google ile kayıt ol
            </button>
          </form>
        </div>

        {/* Giriş Yap Linki */}
        <p className="text-center text-zinc-400 text-sm mt-8">
          Zaten hesabınız var mı?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
          >
            Giriş yapın
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm; 