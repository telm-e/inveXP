const walletService = require('../services/walletService');

const saleValidation = async (req, res, next) => {
    const { clientId, assetId, amount } = req.body;
    const quantity = await walletService.getPreviousQuantity(clientId, assetId);
    if (!quantity) {
      return res.status(404).json({ message: 'Asset not found in this wallet' });
    }
    if ( amount > quantity) {
      return res.status(404).json({ message: 'Invalid amount' });
    }
     next();
  };
  
  module.exports = saleValidation;