import createError from "../utils/error.js";
import {
  createNewUser,
  deleteUnverifiedUserEntries,
  findUserWithPassword,
  findVerifiedUserByEmail,
  findUsersByEmail,
  findVerifiedUserById,
} from "./user.js";
import {
  sendResetPasswordToken,
  sendVerificationCode,
} from "../utils/sendCode.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/bcrypt.js";

const registerService = async (name, email, password) => {
  const user = await findVerifiedUserByEmail(email);

  if (user) {
    throw createError("User already exists!", 400);
  }

  const registrationAttemptsByUser = await findUsersByEmail(email);

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

const verificationService = async (email, verificationCode) => {
  const userAllEntries = await findUsersByEmail(email).sort({
    createdAt: -1,
  });

  if (userAllEntries.length === 0) {
    throw createError("User not found.", 400);
  }

  let user;

  if (userAllEntries.length > 1) {
    user = userAllEntries[0];

    await deleteUnverifiedUserEntries(user._id, email);
  } else {
    user = userAllEntries[0];
  }

  if (user.verificationCode !== Number(verificationCode)) {
    throw createError("Invalid verification code.", 400);
  }

  if (new Date() > user.verificationCodeExpire) {
    throw createError("Verification code has expired.", 400);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    role: user.role,
  };

  const token = await generateAccessToken(payload, process.env.SECRET_KEY);
  const refreshToken = await generateRefreshToken(
    payload,
    process.env.SECRET_KEY
  );

  user.verified = true;
  user.verificationCode = null;
  user.verificationCodeExpire = null;
  user.refreshToken = refreshToken;

  await user.save({ validateModifiedOnly: true });
  return { user, token, refreshToken };
};

const loginService = async (email, password) => {
  const user = await findUserWithPassword(email);

  if (!user) {
    throw createError("User not found.", 404);
  }

  const isPasswordMatch = await comparePassword(password, user.password);

  if (!isPasswordMatch) {
    throw createError("Incorrect password.", 400);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    role: user.role,
  };

  const token = await generateAccessToken(payload, process.env.SECRET_KEY);
  const refreshToken = await generateRefreshToken(
    payload,
    process.env.SECRET_KEY
  );

  user.refreshToken = refreshToken;

  await user.save({ validateModifiedOnly: true });

  return { token, refreshToken };
};

const logoutService = async (userId) => {
  const user = await findVerifiedUserById(userId);

  user.refreshToken = null;
  await user.save({ validateModifiedOnly: true });
};

const forgotPasswordService = async (email) => {
  const user = await findVerifiedUserByEmail(email);

  if (!user) {
    throw createError("Invalid email.", 404);
  }

  const token = await user.generateResetPasswordToken();

  console.log(token);

  await user.save({ validateModifiedOnly: true });

  const resetLink = `http://localhost:5173/forgot-password/${token}`;

  await sendResetPasswordToken(resetLink, email);
};

export {
  registerService,
  verificationService,
  loginService,
  logoutService,
  forgotPasswordService,
};
