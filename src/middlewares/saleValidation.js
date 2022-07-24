const { StatusCodes } = require('http-status-codes');
const walletService = require('../services/walletService');

const saleValidation = async (req, res, next) => {
    const { clientId, assetId, amount } = req.body;
    const quantity = await walletService.getPreviousQuantity(clientId, assetId);
    if (!quantity) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Asset not found in this wallet' });
    }
    if ( amount > quantity) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Invalid amount' });
    }
     next();
  };
  
  module.exports = saleValidation;