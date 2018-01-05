
const getWorkspaces = require('../workspaces');


module.exports = function (args) {
    const dir = process.cwd();
    const workspaces = getWorkspaces(dir);
   process.stdout.write( Object.values(workspaces).map(p => p+'\n'))
}