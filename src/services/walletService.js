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
    const prevQnt = await getPreviousQuantity(clientId, assetId);
    const newQnt = parseInt(prevQnt, 10) - parseInt(amount, 10);
    const { price, available } = await getAssetById(assetId);
    const { balance: prevBalance } = await getAccountById(clientId);
    const transaction = {
        clientId: parseInt(clientId, 10),
        type: 3,
        asset: {
            assetId,
            nowAvailable: parseInt(available, 10) + parseInt(amount, 10),
            price,
        },
        prevQnt: parseInt(prevQnt, 10),
        quantity: parseInt(amount, 10),
        newQnt,
        account: {
          prevBalance: parseInt(prevBalance, 10),
          totalTransaction: price * amount,
          newBalance: parseInt(prevBalance, 10) + (price * amount),
        }
    }
    await walletModel.addTransaction(transaction);
    await walletModel.updateWallet(transaction);
    await walletModel.updateAccount(transaction);
    await walletModel.updateAssets(transaction);
    return transaction;
}

const purchaseTransaction = async (purchaseData) => {
    const { clientId, assetId, amount } = purchaseData;
    const prevQnt = await getPreviousQuantity(clientId, assetId);
    const newQnt = parseInt(prevQnt, 10) + parseInt(amount, 10);
    const { price, available } = await getAssetById(assetId);
    const { balance: prevBalance } = await getAccountById(clientId);
    const transaction = {
        clientId: parseInt(clientId, 10),
        type: 4,
        asset: {
            assetId,
            nowAvailable: parseInt(available, 10) - parseInt(amount, 10),
            price,
        },
        prevQnt: parseInt(prevQnt, 10),
        quantity: parseInt(amount, 10),
        newQnt,
        account: {
          prevBalance: parseInt(prevBalance, 10),
          totalTransaction: price * amount,
          newBalance: parseInt(prevBalance, 10) - (price * amount),
        }
    }
    await walletModel.addTransaction(transaction);
    await walletModel.updateAccount(transaction);
    await walletModel.updateAssets(transaction);
    if (prevQnt === 0) {
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