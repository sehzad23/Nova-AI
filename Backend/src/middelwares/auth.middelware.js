const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "User Unautorized",
    });     
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id);
    // set both `req.user` and `req.userId` so controllers can use either
    req.user = user;
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "User Unautorized",
    });
  }
}



module.exports = {
    authUser
}