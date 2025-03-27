import { verificationCodeTemplate } from "./emailTemplates.js";
import createError from "./error.js";
import sendEmail from "./sendEmail.js";

const sendVerificationCode = (verificationCode, email) => {
  const message = verificationCodeTemplate(verificationCode);

  try {
    sendEmail(email, "Verification code", message);
  } catch (error) {
    throw createError("Failed to send verification code!");
  }
};

export default sendVerificationCode;
