const express = require('express');
const assetController = require('../controllers/assetController');

const routes = express.Router();

routes.get('/', assetController.listAssets);
routes.get('/:id', assetController.getById);

module.exports = routes;