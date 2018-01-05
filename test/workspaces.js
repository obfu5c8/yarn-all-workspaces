const rewire = require('rewire');

const workspaces = rewire('../lib/workspaces.js');

describe('module \'workspaces\'', () => {

    it('exports a function', () => {
        expect(typeof workspaces).toBe('function')
    })

})


describe('function getWorkspaces()', () => {
    
})