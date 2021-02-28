import http from 'http';

import app from './app.js';
import {normalizePort, onError, onListening} from './tools.js';

const port = normalizePort(process.env.PORT || '3000');
const host = '0.0.0.0';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, host);
server.on('error', onError);
server.on('listening', () => onListening(host, port));
