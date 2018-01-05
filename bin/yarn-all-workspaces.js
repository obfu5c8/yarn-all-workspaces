#!/usr/bin/env node

const yargs = require('yargs');
const commands = require('../lib/commands');

require('events').EventEmitter.defaultMaxListeners = Infinity;


const argv = Array.from(process.argv).slice(2);

const parallel = argv[0] === '--parallel' || argv[0] === '-p';
if(parallel) argv.shift();

const cmd = argv.shift();


switch(cmd) {
    case 'run':
        commands.run(parallel, argv);
        break;

    default:
        console.error("Unknown command '%s'", cmd);
        process.exit(1);
}

