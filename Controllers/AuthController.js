const User = require("../Models/user");
const bcryptPassword = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    console.log("register page working");
    const { userName, email, password, role } = req.body;

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User alreay exist",
      });
    }

    const newBcryptPassword = await bcryptPassword.hash(password, 10);

    const registerData = new User({
      userName: userName,
      email: email,
      password: newBcryptPassword,
      role: role,
    });

    await registerData.save();

    res.status(201).json({
      registerData,
      success: true,
      message: "User registration successfull",
    });
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email: email });
  console.log(existUser);

  if (!existUser) {
    return res.status(400).json({
      success: false,
      message: "User not registered",
    });
  }

  const encryptPassword = await bcryptPassword.compare(
    password,
    existUser.password
  );

  if (!encryptPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password from password",
    });
  }

  const tokenData = {
    id: existUser._id,
    email: existUser.email,
    userName: existUser.userName,
    role: existUser.role,
  };

  const token = jwt.sign(tokenData, "asdf123asdf", { expiresIn: 60 * 60 * 5 });

  const tokenOption = {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  };

  return res.status(200).cookie("userToken", token, tokenOption).json({
    success: true,
    message: "Login successful",
    existUser,
  });
}

module.exports = { register, login };
