const YeomanGenerator = require('yeoman-generator');

module.exports = class PrettierGenerator extends YeomanGenerator {
    constructor(...args) {
        super(...args);
    }

    initializing() {
        if (!this.fs.exists('package.json')) {
            this.composeWith(require.resolve('../init'));
        }
    }

    writing() {
        // Setup scripts
        const scripts = {
            prettier:
                'prettier --write --ignore-path config/.prettierignore **/*'
        };
        this.fs.extendJSON('package.json', { scripts }, undefined, 4);

        // Adjust vscode settings
        const settings = {
            'files.exclude': {
                'prettier.config.js': true
            },
            'prettier.ignorePath': 'config/.prettierignore'
        };
        this.fs.extendJSON('.vscode/settings.json', settings, undefined, 4);

        // Copy config files to destination
        this.fs.copy(
            this.templatePath('config'),
            this.destinationPath('config'),
            { globOptions: { dot: true } }
        );
        this.fs.copy(
            this.templatePath('prettier.config.js'),
            this.destinationPath('prettier.config.js')
        );
    }

    install() {
        // Install dependencies
        this.yarnInstall(['prettier'], { dev: true });
    }
};
