const assetService = require('../services/assetService');

const listAssets = async (req, res, next) => {
  try {
    const list = await assetService.listAssets();
    return res.status(200).json(list);
  } catch(err) {
    next(err);
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [getById] = await assetService.getById(id);
    if (getById.length === 0) {
      return res.status(404).json({ message: 'ID not found' });
    }
    if (id < 10000) { // assetId case
      return res.status(200).json(getById[0]);
    }
    // clientId case
    res.status(200).json(getById);
  } catch(err) {
    next(err);
  }
  };

  module.exports = {
    listAssets,
    getById,
}