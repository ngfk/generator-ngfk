const Generator = require('yeoman-generator');

const OPTION_MAP = new Map();

OPTION_MAP.set('private', {
    alias: 'p',
    description: 'Set package.json private to true',
    type: Boolean
});

OPTION_MAP.set('prettier', {
    description: 'Include configuration for prettier',
    type: Boolean,
    default: true
});

OPTION_MAP.set('mobx', {
    description: 'Include the mobx state management library',
    type: Boolean,
    default: false
});

OPTION_MAP.set('jest', {
    description: 'Include the jest testing framework',
    type: Boolean,
    default: true
});

/**
 * @param {Generator} generator
 * @param {string[]} options
 */
function configureOptions(generator, options) {
    for (const option of options) {
        if (!OPTION_MAP.has(option))
            throw new Error('Unknown option: ' + option);

        generator.option(option, OPTION_MAP.get(option));
    }
}

configureOptions.OPTION_MAP = OPTION_MAP;
module.exports = configureOptions;
