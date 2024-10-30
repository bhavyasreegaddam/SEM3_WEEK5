import User from '../model/book.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password with bcrypt
    const hashPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    await createdUser.save(); // Save the new user

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or password" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or password" });
    }

    // If login is successful, respond with user details
    res.status(200).json({
      message: "Login Successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
