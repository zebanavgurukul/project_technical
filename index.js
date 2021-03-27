const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv/config')

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

// controllers
const councilControl = require("./controllers/Apis");

// Routes
app.post("/api/uploadfile", councilControl.csvpost);
app.get("/api/search/:firstname", councilControl.getsearch);
app.get("/api/aggregated", councilControl.getaggregated)

// start server
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`);
});