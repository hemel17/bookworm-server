import asyncHandler from "../middlewares/asyncHandler.js";
import {
  getAllUsersService,
  registerNewAdminService,
} from "../services/user.js";
import createError from "../utils/error.js";

const getAllUsersController = asyncHandler(async (_req, res, next) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
});

const registerNewAdminController = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createError("All the fields are required.", 400));
  }

  if (password.length < 8) {
    return next(
      createError("Password must be at least 8 characters long.", 400)
    );
  }

  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(createError("Admin profile picture is required", 400));
  }

  const { avatar } = req.files;

  try {
    const admin = await registerNewAdminService(name, email, password, avatar);

    res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
});

export { getAllUsersController, registerNewAdminController };
