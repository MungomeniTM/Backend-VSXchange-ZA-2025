const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { fullname, email, username, password, location, skill } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullname, email, username, password: hashedPassword, location, skill
    });

    await newUser.save();
    res.status(201).json({ message: 'Registered successfully. Redirect to login.' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful. Redirect to dashboard.' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
