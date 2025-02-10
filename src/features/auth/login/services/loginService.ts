import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const loginService = {
  loginWithEmail: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  getToken: async (user: any) => {
    return await user.getIdToken();
  },
};

