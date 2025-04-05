import { Router } from "express";
import {
  recordBorrowedBookController,
  returnBorrowedBookController,
} from "../controllers/borrow.js";
const borrowRouter = Router();
import { isAuthenticated } from "../middlewares/authenticate.js";

borrowRouter.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  recordBorrowedBookController
);

borrowRouter.put(
  "/return-borrow-book/:id",
  isAuthenticated,
  returnBorrowedBookController
);

export default borrowRouter;
