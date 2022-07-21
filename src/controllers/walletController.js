const walletService = require('../services/walletService');

const saleTransaction = async (req, res) => {
    const sale = await walletService.saleTransaction(req.body);
    return res.status(200).json(sale);
}

const purchaseTransaction = async (req, res) => {
    const purchase = await walletService.purchaseTransaction(req.body);
    return res.status(200).json(purchase);
}

  module.exports = {
    saleTransaction,
    purchaseTransaction,
  }