import createError from "../utils/error.js";
import { findUserByProperty, createNewUser } from "./user.js";
import sendVerificationCode from "../utils/sendVerificationCode.js";

const registerService = async (name, email, password) => {
  const user = await findUserByProperty("email", email, true);

  if (user && user.length > 0) {
    throw createError("User already exists!", 400);
  }

  const registrationAttemptsByUser = await findUserByProperty(
    "email",
    email,
    false
  );

  if (registrationAttemptsByUser.length >= 5) {
    throw createError(
      "You have reached the registration attempts limit. Please contact support.",
      400
    );
  }

  const newUser = await createNewUser(name, email, password);

  const verificationCode = await newUser.generateVerificationCode();

  await newUser.save();

  await sendVerificationCode(verificationCode, email);

  return newUser;
};

export { registerService };
