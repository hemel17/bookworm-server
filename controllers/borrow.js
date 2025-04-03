import asyncHandler from "../middlewares/asyncHandler.js";
import { recordBorrowedBookService } from "../services/borrow.js";
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

export { recordBorrowedBookController };
