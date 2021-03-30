const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv/config')

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Database
mongoose.connect(process.env.DB_connect,{useNewUrlParser : true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conncted to database.........")
    }).catch((err) => {
        console.log(err)
    });  

// Middieware
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info : {
            title : "Technical Project API",
            version : "1.0.0"
        }
    },
    apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDocs);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// controllers
const councilControl = require("./controllers/Apis");

// Routes
app.post("/api/uploadfile", councilControl.csvpost);
/**
 * @swagger
 * /api/uploadfile:
 *  post:
 *      description: uploadfileCSV
 *      paramaters:
 *      - name: title
 *        description: CSVFile
 *        in: formData
 *        required: true
 *        type: string
 *      responses:
 *          201:
 *              description: Created
 * 
 */

 app.get("/api/aggregated", councilControl.getaggregated)
/**
 * @swagger
 * /api/aggregated:
 *  get:
 *      description: Get all policy_type
 *      responses:
 *          200:
 *              description: success
 */

app.get("/api/search/:firstname", councilControl.getsearch);
/**
 * @swagger
 * /api/search/firstname:
 *  get:
 *      description: Get all search/:firstname
 *      responses:
 *          200:
 *              description: success
 */

// start server
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`);
});