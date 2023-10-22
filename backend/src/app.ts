import express, { Application } from "express";
import http from "http";
import cors from "cors";
import connectDB from "./framework/database/mongoDb/connection/connection";
import expressConfig from "./framework/webServer/express";
import routes from "./framework/webServer/routes";
import serverConfig from "./framework/webServer/server";
import { v2 as cloudinary } from "cloudinary";
import {Server} from "socket.io"
import socketConfig from "./framework/webServer/socketserver"


const app: Application = express();
const server = http.createServer(app);
 const stripe=require('stripe')("sk_test_51O2AEnSEPzyvaD8mADzOFPxkokuOEezDgtEIDGGqKCU8QRRFKR8vL3ZlCBN9pjBpJuKgXoy0JFimx9Nyo1hpqniO004R3cBCG6")
  const uuid= require('uuid').v4
const io = new Server(server, {
  pingTimeout : 60000,
  cors: {
      origin: process.env.SOCKET_SERVER,
      methods: ["GET", "POST"]
  }  
})

app.use(cors());


socketConfig(io)

connectDB();

expressConfig(app);

routes(app);

serverConfig(server);

cloudinary.config({
  cloud_name: "dxmzxwgrd",
  api_key: "878859175157159",
  api_secret: "sgv8imTpVI4wuOo3UdvzqGCTtV4",
});


const servers=new Server