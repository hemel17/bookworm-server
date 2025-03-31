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

authRouter
  .post("/register", registerController)
  .post("/verify/:email", verificationController)
  .post("/login", loginController)
  .post("/password/forgot", forgotPasswordController);
authRouter
  .get("/logout", isAuthenticated, logoutController)
  .get("/profile", isAuthenticated, profileController);
authRouter
  .put("/password/reset/:token", resetPasswordController)
  .put("/password/change", isAuthenticated, changePasswordController);

export default authRouter;
