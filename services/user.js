import User from "../models/User.js";

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
export {
  findVerifiedUserById,
  findVerifiedUserByEmail,
  findVerifiedUserByToken,
  findUsersByEmail,
  findUserWithPassword,
  createNewUser,
  deleteUnverifiedUserEntries,
};
