import { Router } from "express";
const routes = Router();
import authRouter from "./auth.js";
import bookRouter from "./book.js";
import borrowRouter from "./borrow.js";

routes.use("/api/v1/auth", authRouter);
routes.use("/api/v1/book", bookRouter);
routes.use("/api/v1/borrow", borrowRouter);

export default routes;
