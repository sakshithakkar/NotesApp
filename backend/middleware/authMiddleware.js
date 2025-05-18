const jwt = require('jsonwebtoken');
const statusCodes = require('http-status-codes').StatusCodes

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  // If no token is provided, respond with 401 Unauthorized
  if (!token) return res.status(statusCodes.UNAUTHORIZED).json({ message: 'No token provided' });

  try {
    // The token usually comes as 'Bearer <token>', so split and get the actual token part
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // If token verification fails (invalid or expired), respond with 401 Unauthorized
    res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};
