const YeomanGenerator = require('yeoman-generator');
const configureOptions = require('../../utils/configure-options');

module.exports = class ReactGenerator extends YeomanGenerator {
    constructor(...args) {
        super(...args);
        configureOptions(this, ['private', 'prettier', 'mobx', 'jest']);
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
            test: this.options['jest']
                ? 'jest --config ./config/jest.config.js'
                : undefined,
            clean: 'rimraf dist'
        };
        this.fs.extendJSON('package.json', { scripts }, undefined, 4);

        // Copy project files to destination
        this.fs.copy(this.templatePath('base/**/*'), this.destinationRoot(), {
            globOptions: { dot: true }
        });

        // Copy test files to destination
        if (this.options['jest']) {
            this.fs.copy(
                this.templatePath('jest/**/*'),
                this.destinationRoot(),
                { globOptions: { dot: true } }
            );
        }
    }

    install() {
        // Base dependencies
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

        // Optional dependencies
        if (this.options['mobx']) {
            dependencies.push('mobx', 'mobx-react');
        }

        if (this.options['jest']) {
            devDependencies.push(
                '@types/enzyme',
                '@types/jest',
                'enzyme',
                'enzyme-adapter-react-16',
                'jest',
                'jest-enzyme',
                'ts-jest'
            );
        }

        // Install dependencies
        this.yarnInstall(dependencies, { save: true });
        this.yarnInstall(devDependencies, { dev: true });
    }
};
