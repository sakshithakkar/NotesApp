const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const statusCodes = require('http-status-codes').StatusCodes

// Register a new user
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user with this email already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(statusCodes.CREATED).json({ message: 'User created' });
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// Login existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(statusCodes.BAD_REQUEST).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(statusCodes.BAD_REQUEST).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(statusCodes.OK).json({ token });
  } catch (err) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
