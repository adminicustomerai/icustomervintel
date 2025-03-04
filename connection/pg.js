import pg from 'pg';
import environments from '../environments/environment.js';
import devenvironment from '../environments/dev-environment.js';

const { Client } = pg;
let client = new Client();

let connectionConfig = {};
let serverName = "";

if (process.env.NODE_ENV === 'production') {
    connectionConfig = {
        host     : environments.host,
        user     : environments.user,
        password : environments.password,
        database : environments.database,
        port     : environments.port,
        ssl: {
            rejectUnauthorized: false,
        },
    };
    serverName = "production";
} else {
    connectionConfig = {
        host     : devenvironment.host,
        user     : devenvironment.user,
        password : devenvironment.password,
        database : devenvironment.database,
        port     : devenvironment.port,
        ssl: {
            rejectUnauthorized: false,
        },
    };
    serverName = "development";
}

export const connection = new Client(connectionConfig);

connection.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack, connectionConfig);
    } else {
        console.log('Connected to '+ serverName + ' database');
    }
});

