import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TradeFlow API',
      version: '1.0.0',
      description: 'REST API with JWT authentication and role-based access control',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Local server',
      },
      {
        url: 'https://gigflow-94qh.onrender.com/api/v1',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
}

export default swaggerJsdoc(options)