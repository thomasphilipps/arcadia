const jwt = require('jsonwebtoken');
const privateKey = process.env.AUTH_PRIVATE_KEY;

const authenticate = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, privateKey);
      const userId = decodedToken.userId;
      const userRole = decodedToken.userRole;

      if (!roles.length || roles.includes(userRole)) {
        req.auth = { userId, userRole };
        next();
      } else {
        throw 'Insufficient permissions';
      }
    } catch {
      res.status(401).json({ error: 'Invalid request!' });
    }
  };
};

module.exports = { authenticate };
