const assetService = require('../services/assetService');

const getById = async (req, res) => {
    const { id } = req.params;
    const [getById] = await assetService.getById(id);
    if (getById.length === 0) {
      return res.status(404).json({ message: 'ID not found' });
    }
    res.status(200).json(getById[0]);
  };

  module.exports = {
    getById,
}