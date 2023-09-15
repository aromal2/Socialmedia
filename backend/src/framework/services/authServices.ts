import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configKey } from "../../../config";

export const authServices = () => {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };

  const generateToken = (payload: string) => {
    if (configKey.JWT_SECRET_KEY) {
      const token = jwt.sign({ payload }, configKey.JWT_SECRET_KEY, {
        expiresIn: "2d",
      });
      return token;
    } else {
      throw new Error("JWT Token is undefined");
    }
  };

  const verifyToken = (token: string) => {
    if (configKey.JWT_SECRET_KEY) {
      const userId = jwt.verify(token, configKey.JWT_SECRET_KEY);
      return userId;
    }
    return undefined;
  };

  return {
    encryptPassword,
    comparePassword,
    generateToken,
    verifyToken,
  };
};

export type AuthServicesReturn = ReturnType<typeof authServices>;
export type AuthServices = typeof authServices;
