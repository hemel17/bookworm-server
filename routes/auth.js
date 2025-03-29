import { Router } from "express";
const authRouter = Router();
import {
  loginController,
  logoutController,
  profileController,
  registerController,
  verificationController,
} from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/authenticate.js";

authRouter.post("/register", registerController);
authRouter.post("/verify/:email", verificationController);
authRouter.post("/login", loginController);
authRouter.get("/logout", isAuthenticated, logoutController);
authRouter.get("/profile", isAuthenticated, profileController);

export default authRouter;
