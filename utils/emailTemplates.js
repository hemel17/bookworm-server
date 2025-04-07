const verificationCodeTemplate = (verificationCode) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
        <p style="font-size: 16px; color: #333;">Dear User,</p>
        <p style="font-size: 16px; color: #333;">Your verification code is:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
            ${verificationCode}
          </span>
        </div>
        <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. This code will expire in 5 minutes.</p>
        <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
          <p>Thank you,<br>Bookworm Team</p>
          <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
        </footer>
      </div>
    `;
};

const resetPasswordTemplate = (resetLink) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #d32f2f; text-align: center;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #333;">Dear User,</p>
        <p style="font-size: 16px; color: #333;">We received a request to reset your password. Click the button below to proceed:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="display: inline-block; font-size: 18px; font-weight: bold; color: white; background-color: #d32f2f; padding: 12px 24px; border-radius: 5px; text-decoration: none;">
            Reset Password
          </a>
        </div>

        <p style="font-size: 16px; color: #333;">If the button above doesn't work, you can also reset your password by clicking the following link:</p>
        <p style="word-break: break-all; text-align: center;">
          <a href="${resetLink}" style="color: #d32f2f; text-decoration: none;">${resetLink}</a>
        </p>

        <p style="font-size: 16px; color: #d32f2f; font-weight: bold;">Do not share this link with anyone.</p>
        <p style="font-size: 16px; color: #333;">If you did not request a password reset, please ignore this email.</p>

        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
          <p>Thank you,<br>Bookworm Team</p>
          <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
        </footer>
      </div>
    `;
};

const bookReturnReminderTemplate = (userName, bookTitle, dueDate) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #1976d2; text-align: center;">Reminder: Book Due for Return</h2>
      <p style="font-size: 16px; color: #333;">Dear ${userName},</p>
      <p style="font-size: 16px; color: #333;">This is a friendly reminder that the book you borrowed, <strong>"${bookTitle}"</strong>, is due for return on <strong>${dueDate}</strong>, which is in 24 hours.</p>
      
      <p style="font-size: 16px; color: #333;">To avoid any late fees, please return the book by the due date.</p>

      <p style="font-size: 16px; color: #1976d2; font-weight: bold;">Thank you for being a valued member of our community!</p>
      <p style="font-size: 16px; color: #333;">If you have any questions or need further assistance, feel free to reach out to us.</p>

      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
        <p>Thank you,<br>Bookworm Team</p>
        <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
      </footer>
    </div>
  `;
};

export {
  verificationCodeTemplate,
  resetPasswordTemplate,
  bookReturnReminderTemplate,
};
