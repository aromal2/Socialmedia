import { Request, Response, NextFunction } from "express";
import { adminAuthservices } from "../../services/adminAuthservices";

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token: string | null = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    if (typeof token === "string") {
      const { payload }: any = adminAuthservices()?.verifyToken(token);
      if (payload) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default adminMiddleware;
