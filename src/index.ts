import './LoadEnv'; // Must be the first import
import { createConnection, getMetadataArgsStorage } from "typeorm";
import express from "express";

createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root1234",
    "database": "qrinout",
    "synchronize": true,
    "logging": false,
    "entities": getMetadataArgsStorage().tables.map(tbl => tbl.target),
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ]
}).then(connection => {
    console.log("Connected DB")
    // create express app
    const app = express();

    //createInstances

    //run server node
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        console.log('Express server started on port: ' + port);
    });
}).catch(error => console.log("ConnectionDB Error:", error));

// Start the server
// const port = Number(process.env.PORT || 3000);
// app.listen(port, () => {
//     logger.info('Express server started on port: ' + port);
// });
