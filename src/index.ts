import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import {createConnection} from "typeorm";
createConnection().then(connection => {
    console.log("Connected DB")

    //createInstances

    //run server node
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });
}).catch(error => console.log("ConnectionDB Error:",error));

// Start the server
// const port = Number(process.env.PORT || 3000);
// app.listen(port, () => {
//     logger.info('Express server started on port: ' + port);
// });
