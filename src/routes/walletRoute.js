const express = require('express');
const walletController = require('../controllers/walletController');
const saleValidation = require('../middlewares/saleValidation');
const purchaseValidation = require('../middlewares/purchaseValidation');

const routes = express.Router();

routes.post('/purchase', purchaseValidation, walletController.purchaseTransaction);
routes.post('/sale',saleValidation, walletController.saleTransaction);

module.exports = routes;