const assetModel = require('../models/assetModel');

const listAssets = async () => {
  const [list] = await assetModel.listAssets();
  return list;
}
const getById = (id) => {
    if (id < 10000) {
      const getAssetById = assetModel.findAssetById(id);
      return getAssetById;
    }
    const getClientById = assetModel.findClientById(id);
    return getClientById;
};

module.exports = {
  listAssets,
  getById,
}