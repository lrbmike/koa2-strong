const log4js = require('log4js');

class Logger {

    constructor() {
        let config = global.koa_config;
        let loggerConfig = config.logger;

        log4js.configure(loggerConfig);
    }

    getLogger() {
        return log4js.getLogger('logger');
    }

}

let logger = new Logger();

module.exports = logger.getLogger()