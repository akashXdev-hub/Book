const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//manage user signup
exports.userSignup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const validRole = ['user', 'admin'].includes(role) ? role : 'user';

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: validRole
    });

    await newUser.save();

    // ✅ Create token after saving
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // ✅ Send token and user info
    res.status(201).json({
      message: "User signup successful",
      token,
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error signing up user", error });
  }
};


//controler to login

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User is not available" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Build user response
    const userObj = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: "Login successfully",
      token,
      user: userObj,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

