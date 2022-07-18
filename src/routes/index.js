const express = require('express');

const routes = express.Router();

routes.use('/account', require('./accountRoute'));
routes.use('/asset', require('./assetRoute'));

// routes.use(middlewares.error);

module.exports = routes;