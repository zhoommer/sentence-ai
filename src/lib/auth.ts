// lib/auth.ts
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  email: string;
}

export function verifyJwt(token: string): DecodedToken {
  try {
    // Secret key'i burada kullanarak token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return decoded;
  } catch (error) {
    throw new Error("Token doğrulama hatası");
  }
}
