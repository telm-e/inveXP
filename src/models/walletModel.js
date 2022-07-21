const connection = require('./connection');

const findWalletById = async (clientId, assetId) => await connection.execute(
    'SELECT clientId, assetId, quantity FROM Invexp.Wallets WHERE clientId = ? && assetId = ?;', [clientId, assetId],
);

const findAssetById = async (assetId) => await connection.execute(
    'SELECT * FROM Invexp.Assets WHERE id = ?;', [assetId],
);

const findAccountById = async (clientId) => await connection.execute(
    'SELECT * FROM Invexp.Accounts WHERE clientId = ?;', [clientId],
);

const addTransaction = async (transaction) => {
    const { clientId, type, assetId, pQuantity, amount, newQuantity } = transaction;
    const query = 'INSERT INTO Invexp.WalletTransactions(date, clientId, typeId, assetId, previousBalance, amount, newBalance) VALUES (NOW(), ?, ?, ?, ?, ?, ?);'
    const newTransaction = await connection.execute(query, [clientId, type, assetId, pQuantity, amount, newQuantity]);
    return newTransaction;
}

const newWallet = async (transaction) => {
    const { clientId, assetId, amount } = transaction;
    const query = 'INSERT INTO Invexp.Wallets(clientId, assetId, quantity) VALUES (?, ?, ?);';
    await connection.execute(query, [clientId, assetId, amount]);
}

const updateWallet = async (transaction) => {
    const { newQuantity, clientId, assetId } = transaction;
    const query = 'UPDATE Invexp.Wallets SET quantity = ? WHERE clientId = ? && assetId = ?;';
    await connection.execute(query, [newQuantity, clientId, assetId]);
  };

const updateAccount = async (transaction) => {
  const { account, clientId } = transaction;
  const query = 'UPDATE Invexp.Accounts SET balance = ? WHERE clientId = ?;';
  await connection.execute(query, [account.newBalance, clientId]);
};

const updateAssets = async (transaction) => {
    const { assetId, nowAvailable } = transaction;
    const query = 'UPDATE Invexp.Assets SET available = ? WHERE id = ?;';
    await connection.execute(query, [nowAvailable, assetId]);
  };

  module.exports = {
    findWalletById,
    findAssetById,
    findAccountById,
    addTransaction,
    newWallet,
    updateWallet,
    updateAccount,
    updateAssets,
}