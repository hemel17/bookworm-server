import { config } from "dotenv";
config({ path: "./.env" });
import express from "express";
import middleware from "./middleware.js";
import route from "./route.js";
import routes from "../routes/index.js";
import { notFoundHandler, errorHandler } from "./error.js";
import { v2 as cloudinary } from "cloudinary";
import notifyUsers from "../automation/notifyUsers.js";
import removeUnverifiedAccounts from "../automation/removeUnverifiedAccount.js";
import sendGetReq from "../automation/sendGetReq.js";
const app = express();

// * middlewares
app.use(middleware);

// * routes
app.use(route);
app.use(routes);

// * cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// * automation
notifyUsers();
removeUnverifiedAccounts();
sendGetReq();

// * error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
