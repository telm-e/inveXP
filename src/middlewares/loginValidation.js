const { StatusCodes } = require('http-status-codes');
const clientService = require('../services/clientService');

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Some required fields are missing' });
  }

  const getClient = await clientService.getClient(req.body);
  if (!getClient[0]) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Invalid fields' }); 
  }
  
  if (password !== getClient[0].password) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Invalid password' });
  }
     next();
  };
  
  module.exports = loginValidation;