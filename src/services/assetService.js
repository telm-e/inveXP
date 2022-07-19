const assetModel = require('../models/assetModel');

const getById = (id) => {
    if (id < 10000) {
      const getAssetById = assetModel.findAssetById(id);
      return getAssetById;
    }
    const getClientById = assetModel.findClientById(id);
    return getClientById;
};

module.exports = {
    getById,
}