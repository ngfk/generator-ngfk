const YeomanGenerator = require('yeoman-generator');
const sortPackageJson = require('sort-package-json');

const OPTION_MAP = {
    private: {
        alias: 'p',
        description: 'Set package.json private to true',
        type: Boolean
    }
};

module.exports = class InitGenerator extends YeomanGenerator {
    constructor(...args) {
        super(...args);
        for (const option of Object.keys(OPTION_MAP)) {
            this.option(option, OPTION_MAP[option]);
        }
    }

    initializing() {
        const content = {
            name: this.appname,
            version: '1.0.0',
            description: '',
            main: 'index.js',
            author: 'N.G.F. Koster <ngf.koster@outlook.com>',
            license: 'MIT',
            private: this.options['private'] || undefined,
            scripts: {}
        };

        this.fs.writeJSON(
            this.destinationPath('package.json'),
            sortPackageJson(content),
            undefined,
            4
        );
    }
};

module.exports.OPTION_MAP = OPTION_MAP;
