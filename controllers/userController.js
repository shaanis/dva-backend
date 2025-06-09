const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.loginAdminController = async (req, res) => {
  console.log("inside login controller");
  const { email, password } = req.body;

  try {
    const Admin = await users.findOne({ email, password });

    if (!Admin) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: Admin._id }, process.env.JWTPASSWORD);

    res.status(200).json({ user: Admin, token });

  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};



