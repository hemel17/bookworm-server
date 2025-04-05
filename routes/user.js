import { Router } from "express";
const userRouter = Router();
import { isAuthenticated, isAuthorized } from "../middlewares/authenticate.js";
import {
  getAllUsersController,
  registerNewAdminController,
} from "../controllers/user.js";

userRouter.get(
  "/all",
  isAuthenticated,
  isAuthorized("admin"),
  getAllUsersController
);

userRouter.post(
  "/add/admin",
  isAuthenticated,
  isAuthorized("admin"),
  registerNewAdminController
);

export default userRouter;
