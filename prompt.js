var inquirer = require('inquirer');

function prompt () {
    return inquirer.prompt([{
            name: 'consumer_key',
            type: 'password',
            mask: '*'
        },
        {
            name: 'consumer_secret',
            type: 'password',
            mask: '*'
        },
        {
            name: 'token',
            type: 'password',
            mask: '*'
        },
        {
            name: 'token_secret',
            type: 'password',
            mask: '*'
        },
        {
            name: 'idenifier',
            default: 'manyeungultdstuff'
        },
        {
            name: 'slot_count',
            type: 'number',
            default: 10
        }
    ]);
}

module.exports = prompt;