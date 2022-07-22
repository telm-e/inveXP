const { isNamedExportBindings } = require('typescript');
const walletService = require('../services/walletService');

const saleTransaction = async (req, res, next) => {
  try {
    const sale = await walletService.saleTransaction(req.body);
    return res.status(200).json(sale);
  } catch(err) {
    next(err);
  }
}

const purchaseTransaction = async (req, res, next) => {
  try {
    const purchase = await walletService.purchaseTransaction(req.body);
    return res.status(200).json(purchase);
  } catch(err) {
    next(err);
  }
}

  module.exports = {
    saleTransaction,
    purchaseTransaction,
  }