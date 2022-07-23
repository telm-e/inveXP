require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const tokenValidation = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const [, token] = auth.split(' ');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
 try {
   const decoded = jwt.verify(token, SECRET);
   req.user = decoded;
   next();
 } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;