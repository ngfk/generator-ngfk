const YeomanGenerator = require('yeoman-generator');
const { OPTION_MAP: InitOptions } = require('../init');

module.exports = class NodeGenerator extends YeomanGenerator {
    constructor(...args) {
        super(...args);
        this.option('private', InitOptions.private);
    }

    initializing() {
        this.composeWith(require.resolve('../init'), {
            private: this.options['private']
        });
    }

    writing() {
        // Setup scripts
        const scripts = {
            start: 'ts-node ./src/index.ts',
            watch: 'nodemon ./src/index.ts'
        };
        this.fs.extendJSON('package.json', { scripts }, undefined, 4);

        // Configure nodemon
        const nodemonConfig = {
            watch: ['src/**/*.ts'],
            exec: 'ts-node',
            quiet: true,
            events: {
                start: 'clear || cls',
                restart: 'clear || cls'
            }
        };
        this.fs.extendJSON('package.json', { nodemonConfig }, undefined, 4);

        // Copy project files to destination
        this.fs.copy(this.templatePath('**/*'), this.destinationRoot(), {
            globOptions: { dot: true }
        });
    }

    install() {
        // Install dependencies
        const dependencies = [];
        const devDependencies = [
            '@types/node',
            'nodemon',
            'ts-node',
            'typescript'
        ];

        this.yarnInstall(dependencies, { save: true });
        this.yarnInstall(devDependencies, { dev: true });
    }
};
