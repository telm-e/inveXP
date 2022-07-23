const { StatusCodes } = require('http-status-codes');

const errorMiddleware = (err, req, res, next) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Algo deu errado! Mensagem: ${err.message}`);
};

module.exports = errorMiddleware;