const winston = require('winston')

/*const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'http'}),
        new winston.transports.File({filename: './errors.log',  level: 'warn'})
    ]
})*/


const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red",
        error: "red",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "green",
    }
}


//Produccion
const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(winston.format.colorize({ colors: customLevelOptions.colors }), winston.format.simple()),
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "error",
            format: winston.format.simple(),
        }),
    ],
})

//Desarrollo
/*const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(winston.format.colorize({ colors: customLevelOptions.colors }), winston.format.simple()),
        }),
    ],
})*/



/*const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(winston.format.colorize({ colors: customLevelOptions.colors }), winston.format.simple()),
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warning",
            format: winston.format.simple(),
        }),
    ],
})*/

//logger exports

const addlogger = (req, res, next) => {
    req.logger = logger
    //req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

module.exports = {
    logger,
    addlogger
}

// middleware