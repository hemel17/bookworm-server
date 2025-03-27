import { Router } from "express";
const authRouter = Router();
import {
  registerController,
  verificationController,
} from "../controllers/auth.js";

authRouter.post("/register", registerController);
authRouter.post("/verify/:email", verificationController);

export default authRouter;
