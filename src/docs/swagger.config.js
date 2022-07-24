const swaggerConfig = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "inveXP API",
      description: "inveXP: uma API de investimentos e conta corrente"
    },
    servers: [{
      url: "http://localhost:3000",
      description: "servidor local",
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ["./src/routes/index.js"]
}

module.exports = swaggerConfig;