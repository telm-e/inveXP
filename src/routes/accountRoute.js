const express = require('express');
const accountController = require('../controllers/accountController');

const routes = express.Router();

routes.get('/:id', accountController.getById);
routes.post('/deposit', accountController.depositTransaction);
routes.post('/withdrawal', accountController.withdrawalTransaction);

module.exports = routes;