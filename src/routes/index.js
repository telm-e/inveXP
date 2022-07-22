const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');

const routes = express.Router();

routes.use('/login', require('./loginRoute'));
routes.use('/account', tokenValidation, require('./accountRoute'));
routes.use('/asset', require('./assetRoute'));
routes.use('/wallet', tokenValidation, require('./walletRoute'));

// routes.use(middlewares.error);

module.exports = routes;