const fs = require('fs');
const path = require('path');

module.exports = function (dir) {
    return JSON.parse(fs.readFileSync(path.join(dir,'package.json')))
}