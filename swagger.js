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
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const routes = [
  './server.js',            
];



swaggerAutogen(outputFile, routes, doc);

// AI added comments:
// Run "node swagger.js" to generate the swagger-output.json file
// Then run "npm start" to start the server and access the documentation at http://localhost:3000/api-docs

/*
"parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "name_f": {
                  "example": "any"
                },
                "name_l": {
                  "example": "any"
                },
                "email": {
                  "example": "any"
                },
                "collor": {
                  "example": "any"
                },
                "dob": {
                  "example": "any"
                }
              }
            }
          }
        ],
*/ 

