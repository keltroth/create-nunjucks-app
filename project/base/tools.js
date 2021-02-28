import logger from './logger.js';

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
    const port = Number.parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    logger.error(error);
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = (host, port) => {
    logger.info('Web client is ready');
    logger.debug(`http://${host}:${port}`);
};

export {
    normalizePort,
    onListening,
    onError,
};
