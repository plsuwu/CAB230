import dotenv from 'dotenv';
import app from './app';
// import http from 'http';
import https from 'https';
import { __SERVER_PORT, __SERVER_FILEPATH_KEY, __SERVER_FILEPATH_CERT } from '$utils/constants';
import fs from 'fs';

dotenv.config();

const serverOpts = {
    cert: fs.readFileSync(__SERVER_FILEPATH_CERT, 'utf8'),
    key: fs.readFileSync(__SERVER_FILEPATH_KEY, 'utf8'),
};

// http.createServer(app).listen(__SERVER_PORT, () => {
//     console.log(`[*] SERVER (http, non-tls) LISTENING ON PORT ${__SERVER_PORT}.`);
// });

https.createServer(serverOpts, app).listen(__SERVER_PORT, () => {
    console.log(`[*] SERVER LISTENING ON PORT ${__SERVER_PORT}: using HTTPS/self-signed.`);
});

