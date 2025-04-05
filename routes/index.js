import { Router } from "express";
const routes = Router();
import authRouter from "./auth.js";
import bookRouter from "./book.js";
import borrowRouter from "./borrow.js";
import userRouter from "./user.js";

routes.use("/api/v1/auth", authRouter);
routes.use("/api/v1/book", bookRouter);
routes.use("/api/v1/borrow", borrowRouter);
routes.use("/api/v1/user", userRouter);

export default routes;
