const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");

// Register user
async function registerController(req, res) {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  const isuserHere = await userModel.findOne({ email });

  if (isuserHere) {
    return res.status(400).json({
      message: "User Already Exisit",
    });
  }
  console.log(req.body);
  // hasing password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  res.status(201).json({
    message: "User Created Succesfully",
    user: {
      email: user.email,
      _id: user._id,
      fullName: user.fullName,
    },
  });
}
// Login user
async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email password",
    });
  }

  const isPassworsValid = await bcrypt.compare(password, user.password);

  if (!isPassworsValid) {
    return res.status(400).json({
      message: "Invalid email password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    message: "Login successfully",
    user: {
      email: user.email,
      _id: user._id,
      fullName: user.fullName,
    },
  });
}

// Get user details
async function getUserDetails(req, res) {
  const userId = req.userId || (req.user && req.user._id);
  if (!userId) {
    return res.status(401).json({ message: "User Unautorized" });
  }

  const user = await userModel.findById(userId).select("-password"); // Exclude the password field
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User details fetched successfully",
    user,
  });
}

// logout user
async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logout successfully",
  });
}

module.exports = {
  registerController,
  loginUser,
  getUserDetails,
  logoutUser,
};
