import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import createError from "../utils/error.js";

const findVerifiedUserById = (id) => {
  return User.findById(id).where("verified").equals(true);
};

const findVerifiedUserByEmail = (email) => {
  return User.findOne({ email, verified: true });
};

const findVerifiedUserByToken = (resetToken) => {
  return User.findOne({ resetPasswordToken: resetToken, verified: true });
};

const findUsersByEmail = (email) => {
  return User.find({ email, verified: false });
};

const findUserWithPassword = (email) => {
  return User.findOne({ email, verified: true }).select("+password");
};

const createNewUser = (name, email, password) => {
  const user = new User({ name, email, password });
  return user.save();
};

const deleteUnverifiedUserEntries = (id, email) => {
  return User.deleteMany({
    _id: { $ne: id },
    email,
    verified: false,
  });
};

const getAllUsersService = async () => {
  return await User.find({ role: "user", verified: true });
};

const registerNewAdminService = async (name, email, password, avatar) => {
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    throw createError("Unsupported file format.", 400);
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "bookworm_admin_avatars" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary error : ",
      cloudinaryResponse.error || "unknown cloudinary error."
    );
    throw createError("Failed to upload image to cloudinary.", 500);
  }

  const admin = await findVerifiedUserByEmail(email);

  if (admin) {
    throw createError("Admin already registered.", 400);
  }

  const newAdmin = await User.create({
    name,
    email,
    password,
    role: "admin",
    verified: true,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  return newAdmin;
};

export {
  findVerifiedUserById,
  findVerifiedUserByEmail,
  findVerifiedUserByToken,
  findUsersByEmail,
  findUserWithPassword,
  createNewUser,
  deleteUnverifiedUserEntries,
  getAllUsersService,
  registerNewAdminService,
};
