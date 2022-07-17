const connection = require('./connection');
  
const findById = async (id) => await connection.execute(
    'SELECT clientId, balance FROM Invexp.Accounts WHERE clientId=?;', [id],
);

const addTransaction = async (transaction) => {
    const { accountId, type, pBalance, amount, newBalance } = transaction;
    const query = 'INSERT INTO Invexp.AccountTransactions(date, accountId, typeId, previousBalance, amount, newBalance) VALUES (NOW(), ?, ?, ?, ?, ?);'
    const newTransaction = await connection.execute(query, [accountId, type, pBalance, amount, newBalance]);
    return newTransaction;
}

const updateBalance = async (transaction) => {
    const { newBalance, clientId } = transaction;
    const query = 'UPDATE Invexp.Accounts SET balance = ? WHERE clientId = ?;';
    await connection.execute(query, [newBalance, clientId]);
  };

module.exports = {
    findById,
    addTransaction,
    updateBalance,
}