const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
  const sectretKey = process.env.JWT_KEY;
  const token = jwt.sign(
    {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      isAdmin: user?.isAdmin,
    },
    sectretKey
  );
  return token;
};

module.exports = generateAuthToken;
