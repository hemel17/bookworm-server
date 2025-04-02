import asyncHandler from "../middlewares/asyncHandler.js";
import {
  addBookService,
  deleteBookService,
  getAllBooksService,
  getSingleBookService,
} from "../services/book.js";
import createError from "../utils/error.js";

const addBookController = asyncHandler(async (req, res, next) => {
  const { title, author, description, price, quantity } = req.body;

  if (!title || !author || !description || !price || !quantity) {
    return next(createError("All the fields are required.", 400));
  }

  try {
    const book = await addBookService(
      title,
      author,
      description,
      price,
      quantity
    );

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
});

const getSingleBookController = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  try {
    const book = await getSingleBookService(id);

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
});

const getAllBooksController = asyncHandler(async (req, res, next) => {
  try {
    const books = await getAllBooksService();

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    next(error);
  }
});

const deleteBookController = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  try {
    await deleteBookService(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export {
  addBookController,
  getSingleBookController,
  getAllBooksController,
  deleteBookController,
};
