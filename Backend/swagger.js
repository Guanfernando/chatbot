import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Chatbot API',
      version: '1.0.0',
      description: 'API para chatbot con mensajes',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // ruta donde Swagger buscará anotaciones en los archivos de rutas
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
