import {
  resetPasswordTemplate,
  verificationCodeTemplate,
} from "./emailTemplates.js";
import createError from "./error.js";
import sendEmail from "./sendEmail.js";

const sendVerificationCode = async (verificationCode, email) => {
  const message = verificationCodeTemplate(verificationCode);

  try {
    await sendEmail(email, "Verification code", message);
  } catch (error) {
    throw createError("Failed to send verification code!", 400);
  }
};

const sendResetPasswordToken = async (resetLink, email) => {
  const message = resetPasswordTemplate(resetLink);

  try {
    await sendEmail(email, "Reset Password", message);
  } catch (error) {
    throw createError("Failed to send reset password link.", 400);
  }
};

export { sendVerificationCode, sendResetPasswordToken };
