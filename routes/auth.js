import { Router } from "express";
const authRouter = Router();
import {
  changePasswordController,
  forgotPasswordController,
  loginController,
  logoutController,
  profileController,
  registerController,
  resetPasswordController,
  verificationController,
} from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/authenticate.js";

authRouter.post("/register", registerController);
authRouter.post("/verify/:email", verificationController);
authRouter.post("/login", loginController);
authRouter.get("/logout", isAuthenticated, logoutController);
authRouter.get("/profile", isAuthenticated, profileController);
authRouter.post("/password/forgot", forgotPasswordController);
authRouter.post("/password/reset/:token", resetPasswordController);
authRouter.post("/password/change", isAuthenticated, changePasswordController);

export default authRouter;
