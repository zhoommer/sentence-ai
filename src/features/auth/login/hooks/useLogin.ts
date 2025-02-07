import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";

export const useLogin = () => {
  const loginWithEmail = async (email: string, password: string, remember: boolean) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    Cookies.set("token", token, { expires: remember ? 7 : 1 });
  };

  const loginWithGoogle = async (remember: boolean) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    Cookies.set("token", token, { expires: remember ? 7 : 1 });
  };

  return {
    loginWithEmail,
    loginWithGoogle,
  };
}; 