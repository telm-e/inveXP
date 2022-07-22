const walletService = require('../services/walletService');

const purchaseValidation = async (req, res, next) => {
  const { clientId, assetId, amount } = req.body;
  const getAssetById = await walletService.getAssetById(assetId);
  if (!getAssetById) {
    return res.status(404).json({ message: 'Asset ID not found' });
  }
  const { price, available } = getAssetById;
  const total = price * amount;
  const getAccontById = await walletService.getAccountById(clientId);
  if (!getAccontById) {
    return res.status(404).json({ message: 'Client ID not found' });
  }
  const { balance } = getAccontById;
  if (amount > available) {
    return res.status(404).json({ message: 'Invalid amount' });
  }
  if (total > balance) {
    return res.status(404).json({ message: 'Invalid amount' });
  }
     next();
  };
  
  module.exports = purchaseValidation;