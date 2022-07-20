const connection = require('./connection');

const findClientById = async (clientId, assetId) => await connection.execute(
    'SELECT clientId, assetId, quantity FROM Invexp.Wallets WHERE clientId = ? && assetId = ?;', [clientId, assetId],
);

const findAssetById = async (assetId) => await connection.execute(
    'SELECT * FROM Invexp.Assets WHERE id = ?;', [assetId],
);

const addTransaction = async (transaction) => {
    const { clientId, type, assetId, pBalance, amount, newBalance } = transaction;
    const query = 'INSERT INTO Invexp.WalletTransactions(date, clientId, typeId, assetId, previousBalance, amount, newBalance) VALUES (NOW(), ?, ?, ?, ?, ?, ?);'
    const newTransaction = await connection.execute(query, [clientId, type, assetId, pBalance, amount, newBalance]);
    return newTransaction;
}

const newWallet = async (transaction) => {
    const { clientId, assetId, amount } = transaction;
    const query = 'INSERT INTO Invexp.Wallets(clientId, assetId, quantity) VALUES (?, ?, ?);';
    await connection.execute(query, [clientId, assetId, amount]);
}

const updateWallet = async (transaction) => {
    const { newBalance, clientId, assetId } = transaction;
    const query = 'UPDATE Invexp.Wallets SET quantity = ? WHERE clientId = ? && assetId = ?;';
    await connection.execute(query, [newBalance, clientId, assetId]);
  };

  module.exports = {
    findClientById,
    findAssetById,
    addTransaction,
    newWallet,
    updateWallet,
}