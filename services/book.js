import Book from "../models/Book.js";
import createError from "../utils/error.js";

const addBookService = async (title, author, description, price, quantity) => {
  const book = await Book.findOne({ title, author });

  if (book) {
    throw createError("Book already added.", 400);
  }

  const newBook = await Book.create({
    title,
    author,
    description,
    price,
    quantity,
  });

  return newBook;
};

const getSingleBookService = async (bookId) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw createError("Book not found.", 404);
  }

  return book;
};

const getAllBooksService = async () => {
  return await Book.find();
};

const deleteBookService = async (bookId) => {
  const deleteBook = await Book.findByIdAndDelete(bookId);

  if (!deleteBook) {
    throw createError("Couldn't delete this book", 400);
  }
};

export {
  addBookService,
  getSingleBookService,
  getAllBooksService,
  deleteBookService,
};
