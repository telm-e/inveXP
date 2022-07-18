const connection = require('./connection');
  
const findById = async (id) => await connection.execute(
    'SELECT id AS assetId, available, price FROM Invexp.Assets WHERE id=?;', [id],
);

module.exports = {
    findById,
}