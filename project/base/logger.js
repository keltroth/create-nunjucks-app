import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.cli(),
    transports: [
        new winston.transports.Console(),
    ],
});

logger.stream = {
    write(message) {
        logger.info(message.replace('\n', '\0'));
    },
};

logger.debug('Logger prepared');

export default logger;
