import { Router } from "express";
const authRouter = Router();
import { registerController } from "../controllers/auth.js";

authRouter.post("/register", registerController);

export default authRouter;
