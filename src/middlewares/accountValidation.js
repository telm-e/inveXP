const accountService = require('../services/accountService');
const { StatusCodes } = require("http-status-codes");

const accountValidation = async (req, res, next) => {
  const { clientId, amount } = req.body;
  const [getById] = await accountService.getById(clientId);
  if (!getById[0]) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'account not found' });
  }
  if (amount <= 0) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'amount invalid' });
  }
     next();
  };
  
  module.exports = accountValidation;