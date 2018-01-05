const fs = require('fs');
const glob = require('glob');
const path = require('path');
const getPackageJson = require('./package');


function getWorkspaces ( rootDir = process.cwd() ) {

    const packageJson = path.join(rootDir,'package.json')
    const pkg = getPackageJson(rootDir);

    if(!pkg.workspaces || !pkg.workspaces.length) {
        throw new Error("No workspaces")
    }

    const packageGlobs = pkg.workspaces;

    return packageGlobs  
        .map( pattern => glob.sync(pattern, {
                cwd: rootDir,
        }))
        .reduce( (dict, arr) => {
            arr.forEach( dir => {
                const pkg = getPackageJson(path.join(rootDir,dir))
                dict[pkg.name] = dir;
            })
            return dict;
        }, {})
}





module.exports = getWorkspaces;