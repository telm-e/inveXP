const express = require('express');
const accountController = require('../controllers/accountController');
const accountValidation = require('../middlewares/accountValidation');

const routes = express.Router();

routes.get('/:id', accountController.getById);
routes.post('/deposit', accountValidation, accountController.depositTransaction);
routes.post('/withdrawal', accountValidation, accountController.withdrawalTransaction);

module.exports = routes;