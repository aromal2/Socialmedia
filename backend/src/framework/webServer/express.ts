import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const expressConfig = (app: Application) => {
  const enableCors = {
    origin: "*",
    exposeHeaders: [
      "Cross-Origin-Opener-Policy",
      "Cross-Origin-Resource-Policy",
    ],
  };

  app.use(cors(enableCors));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(helmet());
};

export default expressConfig;
