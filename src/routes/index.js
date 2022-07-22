const express = require('express');

const routes = express.Router();

routes.use('/login', require('./loginRoute'));
routes.use('/account', require('./accountRoute'));
routes.use('/asset', require('./assetRoute'));
routes.use('/wallet', require('./walletRoute'));

// routes.use(middlewares.error);

module.exports = routes;