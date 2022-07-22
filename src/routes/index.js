const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');

const routes = express.Router();

routes.use('/login', require('./loginRoute'));
routes.use('/account', tokenValidation, require('./accountRoute'));
routes.use('/asset', tokenValidation, require('./assetRoute'));
routes.use('/wallet', tokenValidation, require('./walletRoute'));

module.exports = routes;