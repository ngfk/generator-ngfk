const YeomanGenerator = require('yeoman-generator');
const sortPackageJson = require('sort-package-json');
const configureOptions = require('../../utils/configure-options');

module.exports = class InitGenerator extends YeomanGenerator {
    constructor(...args) {
        super(...args);
        configureOptions(this, ['private']);
    }

    initializing() {
        const packageJson = this.fs.exists('package.json');
        if (packageJson) return;

        const content = {
            name: this.appname.replace(/ /g, '-'),
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

    writing() {
        // Create vscode settings
        const settings = {
            'files.exclude': {
                '**/.git': true,
                '**/.svn': true,
                '**/.hg': true,
                '**/CVS': true,
                '**/.DS_Store': true,

                node_modules: true,
                '.gitignore': true,
                LICENSE: true,
                'yarn.lock': true
            }
        };

        this.fs.extendJSON(
            this.destinationPath('.vscode/settings.json'),
            settings,
            undefined,
            4
        );
    }
};
