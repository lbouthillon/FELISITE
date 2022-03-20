const { createLogger, transports, format } = require('winston');
const morgan = require('morgan');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.File({
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

logger.stream = {
  write: (msg) => logger.info(msg.substring(0, msg.lastIndexOf('\n'))),
};

morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('user', (req) => JSON.stringify(req.user));

const log = morgan(
  ':method :url :status :response-time ms | :user | :body',
  { stream: logger.stream },
);

module.exports = {
  log,
};
