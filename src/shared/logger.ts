/* eslint-disable no-undef */
import path from 'path';
import { createLogger, format, transports } from 'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf, prettyPrint } = format;

// Custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hours}:${minutes}:${seconds} } [${label}] ${level}: ${message}`;
});


// for success logger
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'MCM' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    // new transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
    //   level: 'info',
    // }),
    new DailyRotateFile({
      filename: path.join(process.cwd(),'logs','winston','successes','mcm-%DATE%-success.log'),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
})

// for error logger
const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'MCM' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    // new transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
    //   level: 'error',
    // }),
    new DailyRotateFile({
      filename: path.join(process.cwd(),'logs','winston','errors','mcm-%DATE%-error.log'),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
})

export { logger, errorLogger }
