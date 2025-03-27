import createError from "../utils/error.js";
import { registerService } from "../services/auth.js";
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

export { registerController };
