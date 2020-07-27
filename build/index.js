"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./LoadEnv");
const typeorm_1 = require("typeorm");
const express_1 = tslib_1.__importDefault(require("express"));
typeorm_1.createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root1234",
    "database": "qrinout",
    "synchronize": true,
    "logging": false,
    "entities": typeorm_1.getMetadataArgsStorage().tables.map(tbl => tbl.target),
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ]
}).then(connection => {
    console.log("Connected DB");
    const app = express_1.default();
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        console.log('Express server started on port: ' + port);
    });
}).catch(error => console.log("ConnectionDB Error:", error));
//# sourceMappingURL=index.js.map