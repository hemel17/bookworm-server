import User from "../models/User.js";

const findUserByProperty = (key, value, verified) => {
  if (key === "_id") {
    return User.findById(value);
  }

  return User.find({ [key]: value, verified });
};

const createNewUser = (name, email, password) => {
  const user = new User({ name, email, password });
  return user.save();
};
export { findUserByProperty, createNewUser };
