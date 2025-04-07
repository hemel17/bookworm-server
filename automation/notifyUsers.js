import cron from "node-cron";
import Borrow from "../models/Borrow.js";
import { bookReturnReminderTemplate } from "../utils/emailTemplates.js";
import { getSingleBookService } from "../services/book.js";
import sendEmail from "../utils/sendEmail.js";
import createError from "../utils/error.js";

const notifyUsers = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const oneDay = new Date(Date.now() + 1000 * 60 * 60 * 24);

      const borrowers = await Borrow.find({
        dueDate: {
          $lt: oneDay,
        },
        returnDate: null,
        notified: false,
      });

      if (borrowers.length > 0) {
        borrowers.forEach(async (users) => {
          const book = await getSingleBookService(users?.book);

          const email = users?.user?.email;

          const userName = users?.user?.name;
          const bookTitle = book.title;
          const dueDate = users.dueDate;

          const message = bookReturnReminderTemplate(
            userName,
            bookTitle,
            dueDate
          );

          sendEmail(email, `Reminder for ${bookTitle}`, message);

          users.notified = true;

          await users.save();
        });
      }
    } catch (error) {
      throw createError(
        "Something went wrong while sending notify email to user",
        400
      );
    }
  });
};

export default notifyUsers;
