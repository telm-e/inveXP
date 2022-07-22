const jwt = require('jsonwebtoken');
const clientService = require('../services/clientService');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const getClient = async (req, res) => {
    const client = await clientService.getClient(req.body);
    const { id, email } = client[0];
    const token = jwt.sign({ id, email }, secret, jwtConfig);
    res.status(200).json({ token });
  };

  module.exports = {
    getClient,
}