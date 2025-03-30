import { Schema, model } from "mongoose";
import { hashPassword } from "../utils/bcrypt.js";
import crypto from "crypto";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    bookTitle: String,
    borrowDate: Date,
    dueDate: Date,
    borrowedBooks: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: "borrow",
        },
        returned: {
          type: Boolean,
          default: false,
        },
      },
    ],
    avatar: {
      public_id: String,
      url: String,
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    refreshToken: String,
  },
  { timestamps: true }
);

// * hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// * generate verification code
userSchema.methods.generateVerificationCode = function () {
  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = new Date(Date.now() + 5 * 60 * 1000);

  return verificationCode;
};

// * generate reset password token
userSchema.methods.generateResetPasswordToken = function () {
  const token = crypto.randomBytes(10).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordTokenExpire = new Date(Date.now() + 5 * 60 * 1000);

  return token;
};

const User = model("User", userSchema);

export default User;
