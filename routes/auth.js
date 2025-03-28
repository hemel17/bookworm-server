import { Router } from "express";
const authRouter = Router();
import {
  loginController,
  registerController,
  verificationController,
} from "../controllers/auth.js";

authRouter.post("/register", registerController);
authRouter.post("/verify/:email", verificationController);
authRouter.post("/login", loginController);

export default authRouter;
