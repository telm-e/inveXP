const connection = require('./connection');
  
const listAssets = async () => await connection.execute(
    'SELECT id AS assetId, name, available, price FROM Invexp.Assets;'
);

const findAssetById = async (id) => await connection.execute(
    'SELECT id AS assetId, name, available, price FROM Invexp.Assets WHERE id=?;', [id],
);

const findClientById = async (id) => await connection.execute(
    'SELECT clientId, assetId, quantity FROM Invexp.Wallets WHERE clientId=?;', [id],
);

module.exports = {
    listAssets,
    findAssetById,
    findClientById,
}