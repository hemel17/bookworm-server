import asyncHandler from "../middlewares/asyncHandler.js";
import {
  borrowedBooksForAdminService,
  recordBorrowedBookService,
  returnBorrowedBookService,
} from "../services/borrow.js";
import createError from "../utils/error.js";

const recordBorrowedBookController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.user;

  try {
    const borrowedBook = await recordBorrowedBookService(id, email);

    res.status(201).json({
      success: true,
      borrowedBook,
    });
  } catch (error) {
    next(error);
  }
});

const returnBorrowedBookController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  console.log(req.user);

  try {
    const returnedBook = await returnBorrowedBookService(id, _id);

    res.status(200).json({
      success: true,
      message:
        returnedBook.fine !== 0
          ? `The book has returned successfully. Total charge with late fee is $${
              returnedBook.price + returnedBook.fine
            }`
          : `The book has returned successfully. Total charge is $${returnedBook.price}`,
      returnedBook,
    });
  } catch (error) {
    next(error);
  }
});

const borrowedBooksController = asyncHandler(async (req, res, next) => {
  try {
    const { borrowedBooks } = req.user;

    res.status(200).json({
      success: true,
      borrowedBooks,
    });
  } catch (error) {
    next(error);
  }
});

const borrowedBooksForAdminController = asyncHandler(async (req, res, next) => {
  try {
    const bookList = await borrowedBooksForAdminService();
    res.status(200).json({
      success: true,
      bookList,
    });
  } catch (error) {
    next(error);
  }
});

export {
  recordBorrowedBookController,
  returnBorrowedBookController,
  borrowedBooksController,
  borrowedBooksForAdminController,
};
