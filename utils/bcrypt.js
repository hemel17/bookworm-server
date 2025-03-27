import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const saltRound = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, saltRound);
  return hash;
};

const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export { hashPassword, comparePassword };
