const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');

const routes = express.Router();


routes.use('/login', require('./loginRoute'));
routes.use('/account', tokenValidation, require('./accountRoute'));
routes.use('/assets', tokenValidation, require('./assetRoute'));
routes.use('/wallet', tokenValidation, require('./walletRoute'));

/**
 * @swagger
 *  components:
 *    schemas:
 *      Auth:
 *        type: object
 *        required:
 *          - token
 *        properties:
 *          token:
 *            type: string
 *        example:
 *          token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDEsImVtYWlsIjoiZG9ubmFoYXJhd2F5QGZha2UuY29tIiwiaWF0IjoxNjU4NjA0MjUzLCJleHAiOjE2NTkyMDkwNTN9.B0DkarS-uXdC4QckpocwHVWsT6nGUDlmKWFBdgqtb7o
 *      Account:
 *        type: object
 *        required:
 *          - clientId
 *          - balance
 *        properties:
 *          id:
 *            type: integer
 *          clientId:
 *            type: integer
 *          balance:
 *            type: decimal
 *        example:
 *          clientId: 10003
 *          balance: 10000.00
 *      Client:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *          email:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *          email: donnaharaway@fake.com
 *          password: cyborg
 *      AccountTransData:
 *        type: object
 *        required:
 *          - clientId
 *          - amount
 *        properties:
 *          clientId:
 *            type: integer
 *          amount:
 *            type: decimal
 *        example:
 *          clientId: 10003
 *          amount: 100.00
 *      DepositTransaction:
 *        type: object
 *        required:
 *          - clientId
 *          - amount
 *        properties:
 *          clientId:
 *            type: integer
 *          type:
 *            type: integer
 *          prevBalance:
 *            type: decimal
 *          amount:
 *            type: decimal
 *          newBalance:
 *            type: decimal
 *        example:
 *          clientId: 10003
 *          type: 2
 *          prevBalance: 800.00
 *          amount: 100.00
 *          newBalance: 900.00
 *      WithdrawalTransaction:
 *        type: object
 *        required:
 *          - clientId
 *          - amount
 *        properties:
 *          clientId:
 *            type: integer
 *          type:
 *            type: integer
 *          prevBalance:
 *            type: decimal
 *          amount:
 *            type: decimal
 *          newBalance:
 *            type: decimal
 *        example:
 *          clientId: 10003
 *          type: 1
 *          prevBalance: 800.00
 *          amount: 100.00
 *          newBalance: 700.00
 *      Wallet:
 *        type: object
 *        required:
 *          - clientId
 *          - assetId
 *          - quantity
 *        properties:
 *          clientId:
 *            type: integer
 *          assetId:
 *            type: integer
 *          quantity:
 *            type: integer
 *        example:
 *          clientId: 10003
 *          assetId: 104
 *          quantity: 15
 *      Asset:
 *        type: object
 *        required:
 *          - assetId
 *          - name
 *          - price
 *          - available
 *        properties:
 *          assetId:
 *            type: integer
 *          name:
 *            type: string
 *          price:
 *            type: decimal
 *          available:
 *            type: integer
 *        example:
 *          assetId: 103
 *          name: ITUB
 *          price: 22.38
 *          available: 698
 *      WalletTransData:
 *        type: object
 *        required:
 *          - clientId
 *          - assetId
 *          - amount
 *        properties:
 *          clientId:
 *            type: interger
 *          assetId:
 *            type: integer
 *          amount:
 *            type: integer
 *        example:
 *          clientId: 10003
 *          assetId: 101
 *          amount: 1
 *      PurchaseTransaction:
 *        type: object
 *        required:
 *          - clientId
 *          - type
 *          - asset
 *          - prevQnt
 *          - quantity
 *          - newQnt
 *          - account
 *        properties:
 *          clientId:
 *            type: interger
 *          assetId:
 *            type: integer
 *          amount:
 *            type: integer
 *        example:
 *          clientId: 10003
 *          type: 4
 *          asset:
 *            assetId: 104
 *            nowAvailable: 685
 *            price: 10.03
 *          prevQnt: 4
 *          quantity: 1
 *          newQnt: 5
 *          account:
 *            prevBalance: 10200
 *            totalTransaction: 10.03
 *            newBalance: 10198.97
 *      SaleTransaction:
 *        type: object
 *        required:
 *          - clientId
 *          - type
 *          - asset
 *          - prevQnt
 *          - quantity
 *          - newQnt
 *          - account
 *        properties:
 *          clientId:
 *            type: interger
 *          assetId:
 *            type: integer
 *          amount:
 *            type: integer
 *        example:
 *          clientId: 10003
 *          type: 3
 *          asset:
 *            assetId: 103
 *            nowAvailable: 698
 *            price: 22.38
 *          prevQnt: 1
 *          quantity: 1
 *          newQnt: 0
 *          account:
 *            prevBalance: 9977
 *            totalTransaction: 22.38
 *            newBalance: 9999.38
 */

/**
 * @swagger
 *  tags:
 *      name: Login
 *      description: Endpoint para login
 */
/**
 * @swagger
 *   /login:
 *     post:
 *       tags: [Login]
 *       description: Endpoint retorna token de autorização
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Client'
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Auth'
 */

/**
 * @swagger
 *  tags:
 *    name: Account
 *    description: Endpoints para transações em conta
 */

/**
 * @swagger
 *   /account/{clientId}:
 *     get:
 *       tags: [Account]
 *       description: Endpoint retorna dados da conta a partir do ID de cliente
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: clientId
 *           type: string
 *           required: true
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Account'
 */
/**
 * @swagger
 *   /account/deposit:
 *     post:
 *       tags: [Account]
 *       description: Endpoint registra um depósito em conta
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AccountTransData'
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/DepositTransaction'
 */
/**
 * @swagger
 *   /account/withdrawal:
 *     post:
 *       tags: [Account]
 *       description: Endpoint registra um saque em conta
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AccountTransData'
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/WithdrawalTransaction'
 */

/**
 * @swagger
 *  tags:
 *    name: Assets
 *    description: Endpoints para dados de ativos
 */
/**
 * @swagger 
 *   /assets:
 *     get:
 *       tags: [Assets]
 *       description: Endpoint retorna os dados de ativos
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 $ref: '#/components/schemas/Asset'
 */
/**
 * @swagger
 *   /assets/{clientId}:
 *     get:
 *       tags: [Assets]
 *       description: Endpoint retorna os ativos investidos pelo cliente a partir de seu clientID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: clientId
 *           type: string
 *           required: true
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 $ref: '#/components/schemas/Wallet'
 */

/**
 * @swagger 
 *   /assets/{assetId}:
 *     get:
 *       tags: [Assets]
 *       description: Endpoint retorna os dados do ativo a partir de seu ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: assetId
 *           type: string
 *           required: true
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 $ref: '#/components/schemas/Asset'
 */
/**
 * @swagger
 *  tags:
 *    name: Wallet
 *    description: Endpoints para transações em carteira de investimento
 */
/**
 * @swagger 
 *   /wallet/sale:
 *     post:
 *       tags: [Wallet]
 *       description: Endpoint registra a venda de um ativo
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/WalletTransData'
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 $ref: '#/components/schemas/SaleTransaction'
 */

/**
 * @swagger 
 *   /wallet/purchase:
 *     post:
 *       tags: [Wallet]
 *       description: Endpoint registra a compra de um ativo
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/WalletTransData'
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 $ref: '#/components/schemas/PurchaseTransaction'
 */

module.exports = routes;