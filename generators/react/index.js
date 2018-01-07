const sortPackageJson = require('sort-package-json');
const YeomanGenerator = require('yeoman-generator');
const { OPTION_MAP: InitOptions } = require('../init');

module.exports = class ReactGenerator extends YeomanGenerator {
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
            start: 'poi dev --config ./config/poi.config.js',
            build: 'poi build --config ./config/poi.config.js',
            clean: 'rimraf dist'
        };
        this.fs.extendJSON('package.json', { scripts }, undefined, 4);

        // Copy project files to destination
        this.fs.copy(this.templatePath('**/*'), this.destinationRoot(), {
            globOptions: { dot: true }
        });
    }

    install() {
        // Install dependencies
        const dependencies = ['react', 'react-dom'];
        const devDependencies = [
            '@ngfk/poi-preset-react-typescript',
            '@types/react',
            '@types/react-dom',
            '@types/react-hot-loader',
            '@types/webpack-env',
            'node-sass',
            'poi',
            'prettier',
            'rimraf',
            'sass-loader',
            'typescript',
            'webpack'
        ];

        this.yarnInstall(dependencies, { save: true });
        this.yarnInstall(devDependencies, { dev: true });
    }
};
