const path = require('path');
const fs = require('fs');


function scripts (rootDir) {
    const packageJson = path.join(rootDir,'package.json');
    if( !fs.existsSync(packageJson) )
        throw new Error("Not a node module");
    
    const pkg = JSON.parse(fs.readFileSync(packageJson));

    if(!pkg.scripts)
        throw new Error("No scripts");
    
    return Object.keys(pkg.scripts);
}


function hasScript (rootDir, script) {
    return scripts(rootDir).indexOf(script) > -1;
}


module.exports = {
    scripts,
    hasScript,
}