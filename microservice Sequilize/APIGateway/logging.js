const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(info => {
  return (info.timestamp + " | " +
    info.trace[0].file + ":" + info.trace[0].line + " | " +
    info.message.split("\n")[0]);
});

module.exports = function () {
  const logger = createLogger({
    format: combine(timestamp(), myFormat)
  });

  logger.exceptions.handle(new transports.File({ filename: './log/logs.log' }));

  process.on('unhandledRejection', (reason, p) => {
    throw p;
  });

}
