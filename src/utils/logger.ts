import winston from 'winston';
import { Environment } from './enums';

/*
  LEVELS
  -----
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
*/

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === Environment.Test ? 'error' : 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.colorize(),
      ),
    }),
  ],
});
