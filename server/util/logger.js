
const mode = process.env.MODE;

const ModeToNum = {
    prod:  0,
    debug: 1,
    dev  : 2
} // function som retunerar -1 ? 

const _translate = (mode, logLevel, exclusive = false) => {
    const modeNum = ModeToNum[mode];
    if(!modeNum) return false;    
    return (!exclusive && modeNum >= logLevel) || (exclusive && modeNum == logLevel)
} 

// =================================

function debugLog(...args) {
    console.log(chalk.blue.bgYellow.bold('DEBUG:'), ...args);
}

function prodLog(...args) {
    console.log(chalk.blue.bgYellow.bold('PROD:'), ...args);
}

function devLog(...args) {
    console.log(chalk.blue.bgYellow.bold('DEV:'), ...args);
}

//========================================

function debug_activate () {
    if(_translate(mode), 'debug') { return debugLog; }
    return () => {};
}

function prod_activate(...args) {
    if(_translate(mode), 'prod')  { return prodLog; }
    return () => {};
}

function dev_activate(...args) {
    if(_translate(mode), 'dev')   { return devLog; }
    return () => {};
}

export default {
    logDebug: debug_activate(),
    logProd:  prod_activate(),
    log:      dev_activate(),
}


