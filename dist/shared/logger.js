"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
/* eslint-disable no-undef */
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf } = winston_1.format;
// Custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hours}:${minutes}:${seconds} } [${label}] ${level}: ${message}`;
});
// for success logger
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'MCM' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        // new transports.File({
        //   filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
        //   level: 'info',
        // }),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'mcm-%DATE%-success.log'),
            datePattern: 'YYYY-DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});
exports.logger = logger;
// for error logger
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'MCM' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        // new transports.File({
        //   filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
        //   level: 'error',
        // }),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'mcm-%DATE%-error.log'),
            datePattern: 'YYYY-DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});
exports.errorLogger = errorLogger;
