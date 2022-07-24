const accountModel = require('../models/accountModel');

const getById = (id) => {
    const getAccountById = accountModel.findById(id);
    return getAccountById;
}

const depositTransaction = async (depositData) => {
    const { clientId, amount } = depositData;
    const [account] = await getById(clientId);
    const { balance } = account[0];
    const newBalance = parseInt(balance, 10) + parseInt(amount, 10);
    const transaction = {
        clientId: parseInt(clientId, 10),
        type: 2,
        prevBalance: parseInt(balance, 10),
        amount: parseInt(amount, 10),
        newBalance: newBalance,
    }
    await accountModel.addTransaction(transaction);
    await accountModel.updateBalance(transaction);
    return transaction;
}

const withdrawalTransaction = async (withdrawalData) => {
    const { clientId, amount } = withdrawalData;
    const [account] = await getById(clientId);
    const { balance } = account[0];
    const newBalance = parseInt(balance, 10) - parseInt(amount, 10);
    const transaction = {
        clientId: parseInt(clientId, 10),
        type: 1,
        prevBalance: parseInt(balance, 10),
        amount: parseInt(amount, 10),
        newBalance: newBalance,
    }
    await accountModel.addTransaction(transaction);
    await accountModel.updateBalance(transaction);
    return transaction;
}

module.exports = {
    getById,
    depositTransaction,
    withdrawalTransaction,
}