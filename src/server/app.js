// express uses http internally
import express from 'express';
import {router} from './routes/router.js';
import mongoose from 'mongoose';
import { LoggingMiddleware } from './middleware/logging.js';
import { ErrorHandlingMiddleware } from './middleware/errorHandling.js';
const PORT = 3000;

const server = express();
// tell express to expect json
server.use(express.json());
server.use(LoggingMiddleware);


server.use(router);
const localDir = import.meta.dirname
server.use(express.static(`${localDir}/../client`));
server.use('/node_modules', express.static(`${localDir}/../../node_modules`));
server.use(ErrorHandlingMiddleware);

try{
    // try to connect to database
    await mongoose.connect('mongodb://localhost:27017/inft2202');
    console.log('connected to the database.');
    
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
