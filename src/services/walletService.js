const walletModel = require('../models/walletModel');

const getClientById = (clientId, assetId) => {
    const getById = walletModel.findClientById(clientId, assetId);
    return getById;
}

const getAssetById = (assetId) => {
    const getById = walletModel.findAssetById(assetId);
    return getById;
}

const saleTransaction = async (saleData) => {
    const { clientId, assetId, amount } = saleData;
    const [wallet] = await getClientById(clientId, assetId);
    const { quantity } = wallet[0];
    const newBalance = parseInt(quantity, 10) - parseInt(amount, 10);
    const transaction = {
        clientId: parseInt(clientId, 10),
        type: 2,
        assetId,
        pBalance: parseInt(quantity, 10),
        amount: parseInt(amount, 10),
        newBalance: newBalance,
    }
    await walletModel.addTransaction(transaction);
    await walletModel.updateWallet(transaction);
    return transaction;
}

const purchaseTransaction = async (purchaseData) => {
    const { clientId, assetId, amount } = purchaseData;
    const [wallet] = await getClientById(clientId, assetId);
    let quantity;
    if (wallet.length === 0) {
      quantity = 0;
    } else {
      quantity = wallet[0].quantity;
    }
    const newBalance = parseInt(quantity, 10) + parseInt(amount, 10);
    const transaction = {
        clientId: parseInt(clientId, 10),
        type: 2,
        assetId,
        pBalance: parseInt(quantity, 10),
        amount: parseInt(amount, 10),
        newBalance: newBalance,
    }
    await walletModel.addTransaction(transaction);
    if (quantity === 0) {
        await walletModel.newWallet(transaction);
    } else {
        await walletModel.updateWallet(transaction);
    }
    return transaction;
}

module.exports = {
    getClientById,
    getAssetById,
    saleTransaction,
    purchaseTransaction,
}