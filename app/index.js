'use strict';

var path = require('path');
var superb = require('superb');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.data = this.data || {};
  },

  prompting: function () {
    var done = this.async();
    var prompts = [];

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ' + superb() + ' and ' + superb() + chalk.red(' gulp') + ' project generator!'));

    prompts.push({
      type: 'input',
      name: 'name',
      message: 'Project name?',
      default: path.basename(this.env.cwd)
    });

    prompts.push({
      type: 'input',
      name: 'description',
      message: 'Project description?',
      default: 'The most ' + superb() + ' and ' + superb() + ' node.js project ever created.'
    });

    prompts.push({
      type: 'input',
      name: 'user',
      message: 'GitHub user/org?',
      store: true
    });

    prompts.push({
      type: 'input',
      name: 'authorname',
      message: 'Author name?',
      store: true
    });

    prompts.push({
      type: 'input',
      name: 'authorurl',
      message: 'Author url?',
      store: true
    });

    prompts.push({
      type: 'confirm',
      name: 'plugin',
      message: 'Are you creating a gulp plugin?',
      default: false
    });

    prompts.push({
      type: 'confirm',
      name: 'gulpfile',
      message: 'Want to add a gulpfile?',
      default: false
    });

    this.prompt(prompts, function (props) {
      this.gulpfile = props.gulpfile;
      this.plugin = props.plugin;

      this.data.name = props.name;
      this.data.description = props.description;

      this.data.user = props.user;

      this.data.author = this.data.author || {};
      this.data.author.name = props.authorname;
      this.data.author.url = props.authorurl;
      done();
    }.bind(this));
  },

  writing: {
    gulpfile: function () {
      if (this.gulpfile) {
        this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
      }
    },

    plugin: function () {
      if (this.plugin) {
        this.fs.copy(this.templatePath('plugin.js'), this.destinationPath('index.js'));
      }
    },

    rootfiles: function () {
      this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.data);
      this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'), this.data);
      this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'), this.data);
      this.fs.copyTpl(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'), this.data);
      this.fs.copyTpl(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'), this.data);
      this.fs.copyTpl(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'), this.data);
    }
  }
});
