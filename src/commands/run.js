
const getWorkspaces = require('../workspaces');
const hasScript = require('../scripts').hasScript;
const createYarnExec = require('../yarn-exec');


module.exports = function (parallel, args) {

    const dir = process.cwd();
    const script = args[0];
    const packages = Object.keys(getWorkspaces(dir));

    const maxNameLength = Math.max(...packages.map(p => p.length));
    const yarnExec = createYarnExec(maxNameLength);


    let tasks;
    if(parallel) {
        tasks = Promise.all(
            packages.map( pkg => {
                if( hasScript(dir, script) ){
                    return yarnExec(dir, pkg, 'run', args)
                } else {
                    console.log("Package %s has no script %s", pkg, script);
                }
            })
            .filter(Boolean)
        )
    }
    else {
        tasks = PromiseSerial(
            packages.map( pkg => () => {
                if( hasScript(dir, script) ){
                    return yarnExec(dir, pkg, 'run', args)
                } else {
                    console.log("Package %s has no script %s", pkg, script);
                }
            })
            .filter(Boolean)
        )
    }

    tasks  
        .then(() => {
            process.exit(0);
        })
        .catch( (err, code) => {
            console.error("FAILED", err);
        })

}



const PromiseSerial = funcs => funcs.reduce( (ac, func) => ac.then(func), Promise.resolve())
