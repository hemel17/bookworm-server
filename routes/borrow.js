import { Router } from "express";
import {
  borrowedBooksController,
  borrowedBooksForAdminController,
  recordBorrowedBookController,
  returnBorrowedBookController,
} from "../controllers/borrow.js";
const borrowRouter = Router();
import { isAuthenticated, isAuthorized } from "../middlewares/authenticate.js";

borrowRouter
  .get(
    "/my-borrowed-books",
    isAuthenticated,
    isAuthorized("user"),
    borrowedBooksController
  )
  .get(
    "/borrowed-by-users",
    isAuthenticated,
    isAuthorized("user"),
    borrowedBooksForAdminController
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
