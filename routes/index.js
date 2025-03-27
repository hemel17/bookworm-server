import { Router } from "express";
const routes = Router();
import authRouter from "./auth.js";

routes.use("/api/v1/auth", authRouter);

export default routes;
