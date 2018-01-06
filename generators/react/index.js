const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    create() {
        const options = {
            name: this.determineAppname()
        };

        this.fs.copy(
            this.templatePath('static/**/*'),
            this.destinationPath('.'),
            { globOptions: { dot: true } }
        );

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            options
        );
    }
};
