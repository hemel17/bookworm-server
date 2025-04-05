import Borrow from "../models/Borrow.js";
import createError from "../utils/error.js";
import { getSingleBookService } from "./book.js";
import { findVerifiedUserByEmail, findVerifiedUserById } from "./user.js";
import calculateFine from "../utils/calculateFine.js";

const recordBorrowedBookService = async (bookId, email) => {
  const book = await getSingleBookService(bookId);

  if (book.quantity === 0) {
    throw createError("Book not available", 400);
  }

  const user = await findVerifiedUserByEmail(email);

  if (!user) {
    throw createError("User not found.", 404);
  }

  const isAlreadyBorrowed = user.borrowedBooks.find(
    (book) => book.bookId.toString() === bookId && book.returned === false
  );

  if (isAlreadyBorrowed) {
    throw createError("Book already borrowed.", 400);
  }

  book.quantity -= 1;
  book.available = book.quantity > 0;

  await book.save();

  user.borrowedBooks.push({
    bookId: book._id,
    bookTitle: book.title,
    borrowedDate: new Date(Date.now()),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await user.save();

  return await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    price: book.price,
    book: book._id,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

const returnBorrowedBookService = async (bookId, userId) => {
  const book = await getSingleBookService(bookId);

  const user = await findVerifiedUserById(userId);

  if (!user) {
    throw createError("User not found.", 404);
  }

  const borrowedBook = user.borrowedBooks.find(
    (book) => book.bookId.toString() === bookId && book.returned === false
  );

  if (!borrowedBook) {
    throw createError("You haven't borrowed this book.", 400);
  }

  borrowedBook.returned = true;
  await user.save();

  book.quantity += 1;
  book.available = book.quantity > 0;
  await book.save();

  const borrow = await Borrow.findOne({
    book: bookId,
    "user.id": userId,
    returnDate: null,
  });

  if (!borrow) {
    throw createError("You haven't borrowed this book.", 400);
  }

  borrow.returnDate = new Date(Date.now());

  const fine = calculateFine(borrow.dueDate);
  borrow.fine = fine;

  await borrow.save();

  return borrow;
};

export { recordBorrowedBookService, returnBorrowedBookService };
