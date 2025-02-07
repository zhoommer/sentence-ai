import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const registerService = {
  registerWithEmail: async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  registerWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  getToken: async (user: any) => {
    return await user.getIdToken();
  },
}; 