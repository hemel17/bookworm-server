import { Router } from "express";
const bookRouter = Router();
import { isAuthenticated, isAuthorized } from "../middlewares/authenticate.js";
import {
  addBookController,
  deleteBookController,
  getAllBooksController,
  getSingleBookController,
} from "../controllers/book.js";

bookRouter
  .get("/all", isAuthenticated, getAllBooksController)
  .get("/:id", isAuthenticated, getSingleBookController);

bookRouter.post(
  "/add",
  isAuthenticated,
  isAuthorized("admin"),
  addBookController
);

bookRouter.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteBookController
);

export default bookRouter;
