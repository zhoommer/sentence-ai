import { registerService } from "../services/registerService";
import { userService } from "../../services/userService";
import Cookies from "js-cookie";

export const useRegister = () => {
  const registerWithEmail = async (email: string, password: string, displayName: string) => {
    const result = await registerService.registerWithEmail(email, password);
    const token = await registerService.getToken(result.user);
    
    // Kullanıcı profilini oluştur
    await userService.createUserProfile(result.user.uid, email, displayName);
    
    Cookies.set("token", token, { expires: 7 });
  };

  const registerWithGoogle = async () => {
    const result = await registerService.registerWithGoogle();
    const token = await registerService.getToken(result.user);
    
    // Google ile giriş yapan kullanıcının profilini oluştur
    if (result.user.displayName) {
      await userService.createUserProfile(
        result.user.uid,
        result.user.email!,
        result.user.displayName
      );
    }
    
    Cookies.set("token", token, { expires: 7 });
  };

  return {
    registerWithEmail,
    registerWithGoogle,
  };
}; 