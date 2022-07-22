const connection = require('./connection');
  
const getClient = async () => await connection.execute(
    'SELECT * FROM Invexp.Clients;'
);

module.exports = {
    getClient,
}