const spawn = require('child_process').spawn;
const Transform = require('stream').Transform;
const split2 = require('split2');
const chalk = require('chalk');


class LabelPrefixer extends Transform {
    constructor(label, prefixLength) {
        super()
        this.prefix = `${label}`
        while(this.prefix.length < prefixLength) {
            this.prefix += ' ';
        }
    }
    _transform( line, enc, cb ) {
        if(line) {
            this.push( new Buffer(`${chalk.gray(this.prefix)}  : ${line.toString()}`) )
            cb();
        }
    }
}


const prefixLines = (label, prefixLength) => {
    return split2()
        .pipe(new LabelPrefixer(label, prefixLength))
}



module.exports = (prefixLength, lineLength=80) => (dir, pkg, cmd, args = []) => {
    return new Promise( (resolve,reject) => {

        const cmdArgs = ['workspace',pkg]
            .concat([cmd])
            .concat(args)

        const proc = spawn('yarn', cmdArgs, {
            cwd: dir,
            env: process.env,
            shell: true,
            stdio: ['ignore','pipe','pipe']
        })

        proc.stdout
            .pipe( prefixLines(pkg, prefixLength) )
            .pipe(process.stdout);

        proc.stderr
            .pipe( prefixLines(pkg, prefixLength))
            .pipe(process.stderr);

        proc.on('exit', code => {
            code ? reject(new Error("Process failed"), code) : resolve()
        })


    });
}