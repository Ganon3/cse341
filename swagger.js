const swaggerAutogen = require('swagger-autogen')();

const doc = {
    swagger: '2.0',
    info: {
        title: 'CSE341 API',
        description: 'for all API endpoints',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    definitions: {
      Contact: {
        type: 'object',
        properties: {
          name_f: { type: 'string', example: 'Fouad' },
          name_l: { type: 'string', example: 'Jaber' },
          email: { type: 'string', example: 'fouadjjaber147@anny.com' },
          collor: { type: 'string', example: 'blue' },
          dob: { type: 'string', example: '01/21/5403' }
        }
      }
    }
};

const outputFile = './swagger-output.json';
const routes = [
  './server.js',            
];



swaggerAutogen(outputFile, routes, doc);

// AI added comments:
// Run "node swagger.js" to generate the swagger-output.json file
// Then run "npm start" to start the server and access the documentation at http://localhost:3000/api-docs

