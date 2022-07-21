const accountService = require('../services/accountService');

const accountValidation = async (req, res, next) => {
  const { clientId, amount } = req.body;
  const [getById] = await accountService.getById(clientId);
  if (!getById[0]) {
    return res.status(404).json({ message: 'Client ID not found' });
  }
  if (amount <= 0) {
    return res.status(404).json({ message: 'Amount invalid' });
  }
     next();
  };
  
  module.exports = accountValidation;