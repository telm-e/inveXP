const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const clientService = require('../services/clientService');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const getClient = async (req, res, next) => {
  try {
    const client = await clientService.getClient(req.body);
    const { id, email } = client[0];
    const token = jwt.sign({ id, email }, secret, jwtConfig);
    res.status(StatusCodes.CREATED).json({ token });
  } catch(err) {
    next(err);
  }
  };

  module.exports = {
    getClient,
}