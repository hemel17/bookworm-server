import { Router } from "express";
import { recordBorrowedBookController } from "../controllers/borrow.js";
const borrowRouter = Router();
import { isAuthenticated } from "../middlewares/authenticate.js";

borrowRouter.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  recordBorrowedBookController
);

export default borrowRouter;
