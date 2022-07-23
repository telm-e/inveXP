const { StatusCodes } = require("http-status-codes");
const accountService = require('../services/accountService');

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [getAccountById] = await accountService.getById(id);
    if (getAccountById.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'account not found' });
    }
    res.status(StatusCodes.OK).json(getAccountById[0]);
  } catch(err) {
    next(err);
  }
};

const depositTransaction = async (req, res, next) => {
  try {
    const deposit = await accountService.depositTransaction(req.body);
    return res.status(StatusCodes.CREATED).json(deposit);
  } catch(err) {
    next(err);
  }
}

const withdrawalTransaction = async (req, res, next) => {
  try {
    const { clientId, amount } = req.body;
    const [getAccountById] = await accountService.getById(clientId);
    const { balance } = getAccountById[0];
    if (amount <= 0 || amount > balance) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Amount invalid' });
    }
    const withdrawal = await accountService.withdrawalTransaction(req.body);
    return res.status(StatusCodes.CREATED).json(withdrawal);
  } catch(err) {
    next(err);
  }
}

  module.exports = {
    getById,
    depositTransaction,
    withdrawalTransaction,
  }