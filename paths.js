const path = require('path');
const rcfile = require('rcfile');
const utils = require('./utils');
const defaultConfig = require('./config');
const rcConfig = rcfile('regenConfig', { configFileName: '.regenConfig' });
const config = Object.assign({}, defaultConfig, rcConfig);

const baseDir = process.cwd();
const templatesDir = utils.existsSync(path.join(baseDir, config.templates)) ?
  path.join(baseDir, config.templates) :
  path.join(__dirname, config.templates);

const actionStub = path.join(templatesDir, config.actionTemplate);
const containerStub = path.join(templatesDir, config.containerTemplate);
const componentStub = path.join(templatesDir, config.componentTemplate);

utils.assert(utils.existsSync(actionStub), 'Action template stub not found.');
utils.assert(utils.existsSync(containerStub), 'Container template stub not found.');
utils.assert(utils.existsSync(componentStub), 'Component template stub not found.');

module.exports = {
  rootDir: config.root,
  actionDir: config.actionPath,
  containerDir: config.containerDir,
  baseDir,
  templatesDir,
  actionStub,
  containerStub,
  componentStub
};