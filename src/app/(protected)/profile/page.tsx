import { ProfileForm } from "@/features/profile/components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profil Ayarları</h1>
        <p className="text-zinc-400">
          Profil bilgilerinizi buradan güncelleyebilirsiniz.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
} 