const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlready = await userModel.findOne({
    email,
  });

  if (isUserAlready) {
    return res.status(400).json({
      message: "User Already Exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Regsitered Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    res.status(400).json({
      message: "Invalid Email or Password.",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid Email or Password.",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User Logged In Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password, phone, address, contactName } = req.body;

  const isPartnerAlready = await foodPartnerModel.findOne({
    email,
  });

  if (isPartnerAlready) {
    return res.status(400).json({
      message: "Food Partner Already Exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodpartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName,
  });

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Food Partner Regsitered Successfully",
    user: {
      _id: foodpartner._id,
      email: foodpartner.email,
      name: foodpartner.name,
      phone: foodpartner.phone,
      address: foodpartner.address,
      contactName: foodpartner.contactName,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const partner = await foodPartnerModel.findOne({
    email,
  });
  if (!partner) {
    res.status(400).json({
      message: "Invalid Email or Password.",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, partner.password);

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid Email or Password.",
    });
  }
  const token = jwt.sign(
    {
      id: partner._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "Food Partner Logged In Successfully",
    user: {
      _id: partner._id,
      email: partner.email,
      name: partner.name,
    },
  });
}

async function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food Partner Logged Out Successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
