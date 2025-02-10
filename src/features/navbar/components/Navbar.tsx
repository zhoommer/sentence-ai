"use client";

import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineBook,
  AiOutlineDashboard,
} from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavbar } from "../hooks/useNavbar";

export const Navbar = () => {
  const { user, pathname, scrolled, handleSignOut } = useNavbar();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? "bg-[#111]/80 backdrop-blur-md" : "bg-[#111]"
        } border-b border-[#222]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Sol taraf - Brand ve Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2">
                <span className="text-white font-bold text-xl">
                  Sentense AI
                </span>
              </Link>

              {/* Ana Navigasyon */}
              {user && (
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      pathname === "/dashboard"
                        ? "bg-blue-600 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-[#222]"
                    }`}
                  >
                    <AiOutlineDashboard size={18} />
                    Dashboard
                  </Link>
                  <Link
                    href="/practice"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      pathname === "/practice"
                        ? "bg-blue-600 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-[#222]"
                    }`}
                  >
                    <AiOutlineBook size={18} />
                    Kelime Pratiği
                  </Link>
                </div>
              )}
            </div>

            {/* Sağ taraf - User menu */}
            {user && (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#222] transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.email?.[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white text-sm hidden sm:block">
                      {user.email}
                    </span>
                  </div>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-[#222] shadow-lg border border-[#333] focus:outline-none">
                    <div className="py-1">
                      {/* Mobil Görünümde Dashboard ve Kelime Pratiği Linkleri */}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={`${
                              active ? "bg-[#333]" : ""
                            } flex md:hidden items-center gap-2 px-4 py-2 text-sm text-white`}
                          >
                            <AiOutlineDashboard size={16} />
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/practice"
                            className={`${
                              active ? "bg-[#333]" : ""
                            } flex md:hidden items-center gap-2 px-4 py-2 text-sm text-white`}
                          >
                            <AiOutlineBook size={16} />
                            Kelime Pratiği
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active ? "bg-[#333]" : ""
                            } flex items-center gap-2 px-4 py-2 text-sm text-white`}
                          >
                            <AiOutlineUser size={16} />
                            Profil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={`${
                              active ? "bg-[#333]" : ""
                            } flex items-center gap-2 px-4 py-2 text-sm text-white w-full`}
                          >
                            <AiOutlineLogout size={16} />
                            Çıkış Yap
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </nav>
      {/* Navbar'ın yüksekliği kadar boşluk bırak */}
      <div className="h-16" />
    </>
  );
};
