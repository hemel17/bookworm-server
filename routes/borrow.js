import { Router } from "express";
import {
  borrowedBooksController,
  recordBorrowedBookController,
  returnBorrowedBookController,
} from "../controllers/borrow.js";
const borrowRouter = Router();
import { isAuthenticated, isAuthorized } from "../middlewares/authenticate.js";

borrowRouter.get(
  "/my-borrowed-books",
  isAuthenticated,
  isAuthorized("user"),
  borrowedBooksController
);

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
