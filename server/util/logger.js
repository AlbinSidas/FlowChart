const chalk = require('chalk');

const mode = process.env.NODE_ENV;

const ModeToNum = {
    prod: 0,
    debug: 1,
    dev: 2,
}; // function som retunerar -1 ?

const _translate = (mode, logLevel, exclusive = false) => {
    const modeNum = ModeToNum[mode];
    const levelNum = ModeToNum[logLevel];
    if (isNaN(modeNum) || isNaN(levelNum)) return false;
    return (
        (!exclusive && modeNum >= levelNum) ||
        (exclusive && modeNum == levelNum)
    );
};

// =================================

function debug(...args) {
    console.log(chalk.black.bgMagenta.bold('DEBUG:'), ...args);
}

function info(...args) {
    console.log(chalk.black.bgBlue.bold('INFO:'), ...args);
}

function log(...args) {
    console.log(chalk.white.bgCyan.bold('LOG:'), ...args);
}

function warn(...args) {
    console.log(chalk.black.bgYellow.bold('WARN:'), ...args);
}

function error(...args) {
    console.log(chalk.black.bgRed.bold('ERROR:'), ...args);
}

//========================================

function debug_activate() {
    if (_translate(mode, 'debug')) {
        return debug;
    }
    return () => {};
}

function info_activate(...args) {
    if (_translate(mode, 'prod')) {
        return info;
    }
    return () => {};
}

function log_activate(...args) {
    if (_translate(mode, 'dev')) {
        return log;
    }
    return () => {};
}

function warn_activate(...args) {
    if (_translate(mode, 'debug')) {
        return warn;
    }
    return () => {};
}

function error_activate(...args) {
    if (_translate(mode, 'prod')) {
        return error;
    }
    return () => {};
}

exported = {
    debug: debug_activate(),
    info: info_activate(),
    log: log_activate(),
    warn: warn_activate(),
    error: error_activate(),
};

module.exports = exported;
