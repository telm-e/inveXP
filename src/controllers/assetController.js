const assetService = require('../services/assetService');

const getById = async (req, res) => {
    const { id } = req.params;
    const [getAssetById] = await assetService.getById(id);
    if (getAssetById.length === 0) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.status(200).json(getAssetById[0]);
  };

  module.exports = {
    getById,
}