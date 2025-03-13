import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

// GENERATE TOKEN

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Route for user login
async function loginUser(req, res) {
  try {
    // we will get email and password from request body
    const { email, password } = req.body;

    // we will check if user exist with the email provided or no
    const user = await userModel.findOne({ email });

    // if user does not exist then throw error
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    // if user exist?  then check if password matches or no
    const isMatch = await bcrypt.compare(password, user.password);

    // if password matches then generate the token and send the token to the user
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({
        success: true,
        token,
      });
    }
    // if password does not match implement the else statement
    else {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// Route for user registration
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // checking is user already exists or not
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 4) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Now create the new User
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Now save user in database
    const user = await newUser.save();
    console.log(user);

    // after storing user in DB we can generate token which will help user to login in application

    const token = createToken(user._id);
    console.log(token);

    // after creating the token we have to set this token as a response

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

//Route for admin login
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

export { loginUser, registerUser, adminLogin };
