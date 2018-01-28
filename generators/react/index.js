const YeomanGenerator = require('yeoman-generator');

const { configureOptions, OPTION } = require('../../utils/options');

module.exports = class ReactGenerator extends YeomanGenerator {
    constructor(...args) {
        super(...args);
        configureOptions(this, [
            OPTION.PRIVATE,
            OPTION.PRETTIER,
            OPTION.MOBX,
            OPTION.JEST
        ]);
    }

    initializing() {
        const p = this.options[OPTION.PRIVATE];
        this.composeWith(require.resolve('../init'), { private: p });

        const prettier = this.options[OPTION.PRETTIER];
        if (prettier) this.composeWith(require.resolve('../prettier'));
    }

    writing() {
        // Setup scripts
        const scripts = {
            start: 'poi dev --config ./config/poi.config.js',
            build: 'poi build --config ./config/poi.config.js',
            test: this.options[OPTION.JEST]
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
        if (this.options[OPTION.JEST]) {
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
        if (this.options[OPTION.MOBX]) {
            dependencies.push('mobx', 'mobx-react');
        }

        if (this.options[OPTION.JEST]) {
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
