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

const getAllBooksService = () => {};
const deleteBookService = () => {};

export {
  addBookService,
  getSingleBookService,
  getAllBooksService,
  deleteBookService,
};
