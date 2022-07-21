const accountService = require('../services/accountService');

const getById = async (req, res) => {
    const { id } = req.params;
    const [getAccountById] = await accountService.getById(id);
    if (getAccountById.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(getAccountById[0]);
  };

const depositTransaction = async (req, res) => {
    const deposit = await accountService.depositTransaction(req.body);
    return res.status(200).json(deposit);
}

const withdrawalTransaction = async (req, res) => {
    const { clientId, amount } = req.body;
    const [getAccountById] = await accountService.getById(clientId);
    const { balance } = getAccountById[0];
    if (amount <= 0 || amount > balance) {
      return res.status(404).json({ message: 'Amount invalid' });
    }
    const withdrawal = await accountService.withdrawalTransaction(req.body);
    return res.status(200).json(withdrawal);
}

  module.exports = {
    getById,
    depositTransaction,
    withdrawalTransaction,
  }