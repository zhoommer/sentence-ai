"use client";

import { useState, useEffect } from "react";
import { useProfileForm } from "../hooks/useProfileForm";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { useRouter } from "next/navigation";
import { PLAN_FEATURES } from "@/features/subscription/types";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Card from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";

export const ProfileForm = () => {
  const { profile, loading, error, success, updateProfile } = useProfileForm();
  const { subscription, loading: subscriptionLoading } = useSubscription();
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (displayName.trim()) {
      await updateProfile(displayName.trim());
    }
  };

  if (loading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FaSpinner className="animate-spin text-2xl text-blue-500" />
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getRemainingUsage = () => {
    if (
      !subscription ||
      subscription?.currentUsage === undefined ||
      subscription?.plan === undefined
    ) {
      return 0;
    }
    const usage = subscription.currentUsage;
    const plan = subscription.plan;
    const practiceLimit = PLAN_FEATURES[plan].practiceLimit;
    return practiceLimit - usage;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Profil Bilgileri</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={profile?.email || ""}
                disabled
                className="bg-[#1a1a1a] cursor-not-allowed"
              />
            </div>

            <div>
              <Label>Ad Soyad</Label>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ad Soyad"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-green-500 text-sm">
                  Profil bilgileriniz başarıyla güncellendi!
                </p>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <span className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  Güncelleniyor...
                </span>
              ) : (
                "Değişiklikleri Kaydet"
              )}
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Üyelik Bilgileri</h2>
            {subscription?.plan !== "premium" && (
              <Button
                onClick={() => router.push("/pricing")}
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              >
                Planı Yükselt
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label className="font-bold text-lg underline">Mevcut Plan</Label>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-sm  ${
                    subscription?.plan === "premium"
                      ? "text-purple-500"
                      : subscription?.plan === "basic"
                        ? "text-blue-500"
                        : "text-zinc-400"
                  }`}
                >
                  {subscription?.plan === "premium"
                    ? "Premium"
                    : subscription?.plan === "basic"
                      ? "Basic"
                      : "Ücretsiz"}
                </span>
                {subscription?.plan === "premium" && (
                  <span className="px-2 py-0.5 text-xs bg-purple-500/10 text-purple-500 rounded-full">
                    Premium Üye
                  </span>
                )}
              </div>
            </div>

            <div>
              <Label className="text-lg font-bold underline">
                Başlangıç Tarihi
              </Label>
              <p className="text-zinc-400 text-sm mt-1">
                {subscription?.startDate
                  ? formatDate(subscription.startDate)
                  : "-"}
              </p>
            </div>

            <div>
              <Label className="text-lg font-bold underline">
                Bitiş Tarihi
              </Label>
              <p className="text-zinc-400 mt-1 text-sm">
                {subscription?.endDate ? formatDate(subscription.endDate) : "-"}
              </p>
            </div>

            {subscription?.plan !== "premium" && (
              <div>
                <Label>Bu Ayki Kullanım</Label>
                <div className="mt-2 p-3 bg-[#111] rounded-lg border border-[#222]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-400">
                      Kalan Pratik Hakkı
                    </span>
                    <span className="font-semibold">
                      {getRemainingUsage()} /{" "}
                      {subscription?.plan
                        ? PLAN_FEATURES[subscription.plan].practiceLimit
                        : 0}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          subscription?.plan
                            ? (getRemainingUsage() /
                                PLAN_FEATURES[subscription.plan]
                                  .practiceLimit) *
                                100
                            : 0,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
