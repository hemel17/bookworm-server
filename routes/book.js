import { Router } from "express";
const bookRouter = Router();
import { isAuthenticated } from "../middlewares/authenticate.js";
import {
  addBookController,
  getAllBooksController,
  getSingleBookController,
} from "../controllers/book.js";

bookRouter
  .get("/all", isAuthenticated, getAllBooksController)
  .get("/:id", isAuthenticated, getSingleBookController);
bookRouter.post("/add", isAuthenticated, addBookController);
bookRouter.delete("/delete/:id");

export default bookRouter;
