const walletService = require('../services/walletService');

const saleTransaction = async (req, res) => {
    const { clientId, assetId, amount } = req.body;
    const [getClientById] = await walletService.getClientById(clientId, assetId);
    const { quantity } = getClientById[0];
    if ( amount > quantity) {
      return res.status(404).json({ message: 'Amount invalid' });
    }
    const sale = await walletService.saleTransaction(req.body);
    return res.status(200).json(sale);
}

const purchaseTransaction = async (req, res) => {
    const { clientId, assetId, amount } = req.body;
    const [getAssetById] = await walletService.getAssetById(assetId);
    const { available } = getAssetById[0];
    if (amount > available) {
      return res.status(404).json({ message: 'Amount invalid' });
    }
    const purchase = await walletService.purchaseTransaction(req.body);
    return res.status(200).json(purchase);
}

  module.exports = {
    saleTransaction,
    purchaseTransaction,
  }