const assetModel = require('../models/assetModel');

const getById = (id) => {
    const getAssetById = assetModel.findAssetById(id);
    return getAssetById;
};

module.exports = {
    getById,
}