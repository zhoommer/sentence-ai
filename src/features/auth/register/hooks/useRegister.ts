import { registerService } from "../services/registerService";
import Cookies from "js-cookie";

export const useRegister = () => {
  const registerWithEmail = async (email: string, password: string) => {
    const result = await registerService.registerWithEmail(email, password);
    const token = await registerService.getToken(result.user);
    Cookies.set("token", token, { expires: 7 });
  };

  const registerWithGoogle = async () => {
    const result = await registerService.registerWithGoogle();
    const token = await registerService.getToken(result.user);
    Cookies.set("token", token, { expires: 7 });
  };

  return {
    registerWithEmail,
    registerWithGoogle,
  };
}; 