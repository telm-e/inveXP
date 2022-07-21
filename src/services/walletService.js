const { getAllJSDocTagsOfKind } = require('typescript');
const walletModel = require('../models/walletModel');

const getPreviousQuantity = async (clientId, assetId) => {
    const [wallet] = await walletModel.findWalletById(clientId, assetId);
    if (wallet.length === 0) {
      return 0;
    }
    const { quantity } = wallet[0];
    return quantity;
}

const getAssetById = async (assetId) => {
    const [asset] = await walletModel.findAssetById(assetId);
    return asset[0];
}

const getAccountById = async (clientId) => {
    const [account] = await walletModel.findAccountById(clientId);
    return account[0];
}

const saleTransaction = async (saleData) => {
    const { clientId, assetId, amount } = saleData;
    const pQuantity = await getPreviousQuantity(clientId, assetId);
    const newQuantity = parseInt(pQuantity, 10) - parseInt(amount, 10);
    const { price, available } = await getAssetById(assetId);
    const { balance: pBalance } = await getAccountById(clientId);
    const transaction = {
        clientId: parseInt(clientId, 10),
        type: 2,
        assetId,
        nowAvailable: parseInt(available, 10) + parseInt(amount, 10),
        price,
        pQuantity: parseInt(pQuantity, 10),
        amount: parseInt(amount, 10),
        newQuantity,
        account: {
          pBalance: parseInt(pBalance, 10),
          totalTransaction: price * amount,
          newBalance: parseInt(pBalance, 10) + (price * amount),
        }
    }
    console.log(transaction);
    await walletModel.addTransaction(transaction);
    await walletModel.updateWallet(transaction);
    await walletModel.updateAccount(transaction);
    await walletModel.updateAssets(transaction);
    return transaction;
}

const purchaseTransaction = async (purchaseData) => {
    const { clientId, assetId, amount } = purchaseData;
    const pQuantity = await getPreviousQuantity(clientId, assetId);
    const newQuantity = parseInt(pQuantity, 10) + parseInt(amount, 10);
    const { price, available } = await getAssetById(assetId);
    const { balance: pBalance } = await getAccountById(clientId);
    const transaction = {
        clientId: parseInt(clientId, 10),
        type: 1,
        assetId,
        nowAvailable: parseInt(available, 10) - parseInt(amount, 10),
        price,
        pQuantity: parseInt(pQuantity, 10),
        amount: parseInt(amount, 10),
        newQuantity,
        account: {
          pBalance: parseInt(pBalance, 10),
          totalTransaction: price * amount,
          newBalance: parseInt(pBalance, 10) - (price * amount),
        }
    }
    await walletModel.addTransaction(transaction);
    await walletModel.updateAccount(transaction);
    await walletModel.updateAssets(transaction);
    if (pQuantity === 0) {
        await walletModel.newWallet(transaction);
    } else {
        await walletModel.updateWallet(transaction);
    }
    return transaction;
}

module.exports = {
    getPreviousQuantity,
    getAssetById,
    getAccountById,
    saleTransaction,
    purchaseTransaction,
}