const UserModel = require("../models/user");
const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
require('dotenv/config')

module.exports = {
    csvpost: (req,res) => {
        let url = process.env.DB_connect;
        // console.log(url);
        csvtojson()
            .fromFile("customers.csv")
            .then(csvData => {
                // console.log(csvData);
                mongodb.connect( 
                url,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                    if (err) throw err;
                    client
                    .db("")
                    .collection("")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;
                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
                }
                );
        });
    },
    getsearch : (req,res) => {
        var regex = new RegExp(req.params.firstname)
        UserModel.find({firstname:regex})
        .then(Response => {
            console.log(Response);
            res.send(Response);
        })
        .catch((err) => {
            res.json({err});
        })
    },
    getaggregated : (req,res) => {
        UserModel.aggregate (
            [ { $match : { policy_type : "Single" } } ]
        )
        .then(Response => {
            console.log(Response);
            res.send(Response);
        })
        .catch((err) => {
            res.json({err});
        })
    }
}