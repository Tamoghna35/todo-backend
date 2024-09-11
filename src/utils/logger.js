import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.Console(),

        // Info logs (this will log 'info' and lower-level logs like 'debug')
        new transports.File({ filename: 'logs/info.log', level: 'info', maxLevel: 'info'  }),

        // Warn logs (this will log 'warn' and errors)
        new transports.File({ filename: 'logs/warn.log', level: 'warn',maxLevel: 'warn' }),

        // Error logs (only 'error' level logs will go here)
        new transports.File({ filename: 'logs/error.log', level: 'error', })
    ]
});

export default logger;