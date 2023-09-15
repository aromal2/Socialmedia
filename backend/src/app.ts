import express, { Application } from "express";
import http from "http";
import cors from "cors";
import connectDB from "./framework/database/mongoDb/connection/connection";
import expressConfig from "./framework/webServer/express";
import routes from "./framework/webServer/routes";
import serverConfig from "./framework/webServer/server";
import { v2 as cloudinary } from "cloudinary";

const app: Application = express();
const server = http.createServer(app);

app.use(cors());

connectDB();

expressConfig(app);

routes(app);

serverConfig(server);

cloudinary.config({
  cloud_name: "dxmzxwgrd",
  api_key: "878859175157159",
  api_secret: "sgv8imTpVI4wuOo3UdvzqGCTtV4",
});
