const connection = require('./connection');
  
const findAssetById = async (id) => await connection.execute(
    'SELECT id AS assetId, available, price FROM Invexp.Assets WHERE id=?;', [id],
);

module.exports = {
    findAssetById,
}