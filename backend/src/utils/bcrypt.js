const bcrypt = require("bcrypt");

exports.hash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
exports.compare = async (password, syspassword) => {
  const verifiedPassword = await bcrypt.compare(password, syspassword);
  return verifiedPassword;
};