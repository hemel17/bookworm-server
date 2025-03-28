import createError from "../utils/error.js";
import {
  loginService,
  registerService,
  verificationService,
} from "../services/auth.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const registerController = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createError("Name, Email and Password are required.", 400));
  }

  if (password.length < 8) {
    return next(
      createError("Password must be at least 8 characters long!", 400)
    );
  }

  try {
    const user = await registerService(name, email, password);

    res.status(201).json({
      success: true,
      message: "Verification code sent.",
      user,
    });
  } catch (error) {
    next(error);
  }
});

const verificationController = asyncHandler(async (req, res, next) => {
  const { email } = req.params;
  const { verificationCode } = req.body;

  if (!email) {
    return next(createError("Something went wrong. Please try again.", 400));
  }

  if (!verificationCode) {
    return next(createError("Enter your verification code.", 400));
  }

  try {
    const { user, token, refreshToken } = await verificationService(
      email,
      verificationCode
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.json({
      success: true,
      message: "Account verified.",
      user,
    });
  } catch (error) {
    next(error);
  }
});

const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError("Email and Password are required.", 400));
  }

  try {
    const { user, token, refreshToken } = await loginService(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
});

export { registerController, verificationController, loginController };
