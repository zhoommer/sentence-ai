import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Kullanıcı oturum açmışsa
        const token = await user.getIdToken();
        Cookies.set("token", token, { expires: 7 });
      } else {
        // Kullanıcı oturum açmamışsa
        Cookies.remove("token");
        router.push("/login");
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [router]);
}; 