const clientModel = require('../models/clientModel');

const getClient = async (data) => {
    const { email, password } = data;
    const [getClients] = await clientModel.getClient();
    const client = getClients.filter((one) => one.email === email);
    return client;
}

module.exports = {
    getClient,
}