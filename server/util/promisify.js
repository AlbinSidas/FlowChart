const _promisify  = (func) => {
    return (...args) => { 
        return new Promise((accept, reject)=> {
            //const cb = args.pop();
            func(...args, (err, result) => {
                if (err) { 
                    reject(err)
                } else {
                    accept(result);
                }
            });

        });
    }
}


module.exports = _promisify