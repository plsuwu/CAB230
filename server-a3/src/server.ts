import dotenv from 'dotenv';
import app from './app';
// import http from 'http';
import https from 'https';
import { __SERVER } from '$utils/constants';
import fs from 'fs';

dotenv.config();

const serverOpts = {
    cert: fs.readFileSync(__SERVER.FILEPATH.CERT, 'utf8'),
    key: fs.readFileSync(__SERVER.FILEPATH.KEY, 'utf8'),
};

// http.createServer(app).listen(__SERVER_PORT, () => {
//     console.log(`[*] SERVER (http, non-tls) LISTENING ON PORT ${__SERVER_PORT}.`);
// });

https.createServer(serverOpts, app).listen(__SERVER.PORT, () => {
    console.log(`[*] SERVER LISTENING ON PORT ${__SERVER.PORT}: using HTTPS/self-signed.`);
});

