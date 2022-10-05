import Winston from 'winston';
import 'winston-daily-rotate-file';
import ecsFormat from '@elastic/ecs-winston-format';

const { format, transports: Transports } = Winston;
const { combine, timestamp, colorize, printf, errors, prettyPrint } = format;
const colorizer = colorize();
// custom log level (reference: syslog severity levels)
const logLevels = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};
// custom log level colors
const logLevelColors = {
  message: 'white',
  topic: 'gray italic',
  emergency_level: 'white redBG bold',
  emergency_header: 'red',
  alert_level: 'black yellowBG bold',
  alert_header: 'yellow',
  critical_level: 'magenta bold',
  critical_header: 'magenta',
  error_level: 'red bold',
  error_header: 'red',
  warning_level: 'yellow bold',
  warning_header: 'yellow',
  notice_level: 'cyan bold',
  notice_header: 'cyan',
  info_level: 'blue bold',
  info_header: 'blue',
  debug_level: 'green bold',
  debug_header: 'green',
};
// add level colors
Winston.addColors(logLevelColors);
// init transports configuration console
const defaultConsole = new Transports.Console({
  level: 'debug',
  // format: ecsFormat({ apmIntegration: true }),
  format: combine(
    errors({ stack: true }), // <-- use errors format
    // colorize(),
    timestamp(),
    prettyPrint()
  ),
  // format: combine(
  //   timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
  //   printf((log) => {
  //     let output = '';
  //     const { level, message, timestamp2 } = log;
  //     const header = ` ${timestamp2} | ${
  //       process.env.NODE_HOST || 'not-set'
  //     } | version: ${process.env.APP_VERSION || '1.0'} | ${colorizer.colorize(
  //       'topic',
  //       `${message.topic} - `,
  //     )}`;
  //     output += `${colorizer.colorize(
  //       `${level}_level`,
  //       `> ${level}${' '.repeat(9 - level.length + 1)}|`,
  //     )}`;
  //     output += `${colorizer.colorize(`${level}_header`, header)}`;
  //     output += ` ${colorizer.colorize('message', message.body)}`;
  //     return output;
  //   }),
  // ),
});
// init transport configuration rotate file
// create / init default logger
const defaultLogger: any = Winston.createLogger({
  format: ecsFormat({ apmIntegration: true }),
  levels: logLevels,
  transports: [defaultConsole],
});
// create / init export logger
const logger = {
  emergency: (body: any, topic = 'unknown-topic') => {
    defaultLogger.emergency({ body, topic });
  },
  alert: (body: any, topic = 'unknown-topic') => {
    defaultLogger.alert({ body, topic });
  },
  critical: (body: any, topic = 'unknown-topic') => {
    defaultLogger.crtical({ body, topic });
  },
  error: (body: any, topic = 'unknown-topic') => {
    const message = { body: body instanceof Error ? body.stack : body, topic };
    defaultLogger.error(message);
  },
  warning: (body: any, topic = 'unknown-topic') => {
    defaultLogger.warning({ body, topic });
  },
  notice: (body: any, topic = 'unknown-topic') => {
    defaultLogger.notice({ body, topic });
  },
  info: (body: any, topic = 'unknown-topic') => {
    const message = {
      body: body instanceof Array ? body.join('\n') : body,
      topic,
    };
    defaultLogger.info(message);
  },
  debug: (body: any, topic = 'unknown-topic') => {
    const message = { body, topic };
    if (body instanceof Object) {
      message.body = JSON.stringify(body, null, 1);
    }
    defaultLogger.debug(message);
  },
  query: (...args: any[]) => {
    defaultLogger.debug({ body: args[0], topic: 'sequelize' });
  },
};

export default logger;
