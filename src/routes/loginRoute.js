const express = require('express');
const loginController = require('../controllers/loginController');
const loginValidation = require('../middlewares/loginValidation');

const routes = express.Router();

routes.post('/', loginValidation, loginController.getClient);

module.exports = routes;