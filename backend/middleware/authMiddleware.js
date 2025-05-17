const jwt = require('jsonwebtoken');
const statusCodes = require('http-status-codes').StatusCodes


module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(statusCodes.UNAUTHORIZED).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};
