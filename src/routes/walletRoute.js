const express = require('express');
const walletController = require('../controllers/walletController');

const routes = express.Router();

routes.post('/purchase', walletController.purchaseTransaction);
routes.post('/sale', walletController.saleTransaction);

module.exports = routes;