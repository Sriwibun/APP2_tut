import express from 'express'
import HTTP_CODES from '../utils/httpCodes.mjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import router from './routes/workoutAPI.mjs';
import pool from './db.mjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const port = (process.env.PORT || 9000);


server.set('port', port);
server.use(express.json());
// server.use(logger);
// server.use(startSession);
server.use(express.static(path.join(__dirname, '../client/public')));
server.use("/workout", router);


pool.connect((err, client, release) =>{
    if(err){
        console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to database');
    release();
});

// server.use(updateSession);

server.listen(server.get('port'), function () {
    console.log('server running on port: ', server.get('port'));
});


export default server;