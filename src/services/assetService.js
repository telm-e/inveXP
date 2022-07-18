const assetModel = require('../models/assetModel');

const getById = (id) => {
    const getAssetById = assetModel.findById(id);
    return getAssetById;
};

module.exports = {
    getById,
}