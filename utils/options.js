const YeomanGenerator = require('yeoman-generator');

const OPTION = {
    PRIVATE: 'private',
    PRETTIER: 'prettier',
    MOBX: 'mobx',
    JEST: 'jest'
};

const OPTIONS_MAP = {
    [OPTION.PRIVATE]: {
        alias: 'p',
        description: 'Set package.json private to true',
        type: Boolean
    },
    [OPTION.PRETTIER]: {
        description: 'Include configuration for prettier',
        type: Boolean,
        default: true
    },
    [OPTION.MOBX]: {
        description: 'Include the mobx state management library',
        type: Boolean,
        default: false
    },
    [OPTION.JEST]: {
        description: 'Include the jest testing framework',
        type: Boolean,
        default: true
    }
};

/**
 * @param {YeomanGenerator} generator
 * @param {OPTION[]} options
 */
const configureOptions = (generator, options) => {
    for (const option of options) {
        if (!OPTION_MAP.has(option))
            throw new Error('Unknown option: ' + option);

        generator.option(option, OPTION_MAP.get(option));
    }
};

module.exports = {
    OPTION,
    configureOptions
};
