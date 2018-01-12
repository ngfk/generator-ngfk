const YeomanGenerator = require('yeoman-generator');
const configureOptions = require('../../utils/configure-options');

module.exports = class ReactGenerator extends YeomanGenerator {
    constructor(...args) {
        super(...args);
        configureOptions(this, ['private', 'prettier']);
    }

    initializing() {
        const p = this.options['private'];
        this.composeWith(require.resolve('../init'), { private: p });

        const prettier = this.options['prettier'];
        if (prettier) this.composeWith(require.resolve('../prettier'));
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
