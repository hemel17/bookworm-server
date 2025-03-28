import { Router } from "express";
const authRouter = Router();
import {
  loginController,
  logoutController,
  registerController,
  verificationController,
} from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/authenticate.js";

authRouter.post("/register", registerController);
authRouter.post("/verify/:email", verificationController);
authRouter.post("/login", loginController);
authRouter.get("/logout", isAuthenticated, logoutController);

export default authRouter;
