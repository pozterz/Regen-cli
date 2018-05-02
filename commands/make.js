const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const uppercase = require('lodash.toupper');
const capitalize = require('lodash.capitalize');
const kebab = require('lodash.kebabcase');
const lowercase = require('lodash.tolower');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make <name>')
  .action((name, options) => {
    const plural = lowercase(name + 's')
    const fileName = `${lowercase(kebab(plural))}.js`;
    const dirName = `${capitalize(plural)}`

    const containerPath = path.join(
      paths.baseDir,
      options.parent.root,
      paths.containerDir
    );
    const insertPath = path.join(
      paths.actionDir,
      options.parent.root,
      options.parent.path
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"make" insert path does not exist.'
    );

    utils.info(`Creating state "${name}"...`);

    utils.exists(`${insertPath}${fileName}`)
      .then(() => utils.exit(
        `State folder with name "${fileName}" already exists.`
      ))
      .catch(() => utils.read(paths.actionStub, 'utf8'))
      .then(content => {
        const actionType = ["ADD","UPDATE","DELETE"]
          .map(action => `${name}_${action}`)
          .map(snakeCase)
          .map(uppercase);

        const actionTypes = ["ADD","UPDATE","DELETE"]
          .map(action => `${plural}_${action}`)
          .map(uppercase);

        return Promise.resolve(
          template(content)({
            types: actionTypes,
            name,
            Name: capitalize(name),
            plural,
            Plural: capitalize(plural),
            type: actionType,
          })
       )
      })
      .then(content => utils.write(`${insertPath}/${fileName}`, content))
      .then(() => utils.success(
        `Action folder successfully created!
        ==> "${insertPath}${fileName}"`
      ))
      .catch(utils.exit);

      // Container
      utils.info(`Creating container component "${name}" inside "${fileName}"...`);

      utils.exists(`${containerPath}/${dirName}`)
      .then(() => utils.exit(
        `State folder with name "${dirName}" already exists.`
      ))
      .catch(() => utils.mkdir(`${containerPath}/${dirName}`))

      utils.exists(`${containerPath}/${dirName}/index.js`)
        .then(() => utils.exit(`Container component "${name}" already exists.`))
        .catch(() => utils.read(paths.containerStub, 'utf8'))
        .then(content => Promise.resolve(
          template(content)({
            name,
            Name: capitalize(name),
            plural,
            Plural: capitalize(plural),
            actionPath: `${paths.actionDir}/${plural}`,
          })
        ))
        .then(content => utils.write(`${containerPath}/${dirName}/index.js`, content))
        .then(() => utils.success(
          `Container component ${name} successfully created! ==> "${containerPath}/${dirName}/index.js"`
        ))
      .catch(utils.exit);
      
      utils.exists(`${containerPath}/${dirName}/${capitalize(plural)}.js`)
        .then(() => utils.exit(`Container component "${capitalize(plural)}" already exists.`))
        .catch(() => utils.read(paths.componentStub, 'utf8'))
        .then(content => Promise.resolve(
          template(content)({
            name,
            Name: capitalize(name),
            plural,
            Plural: capitalize(plural),
            actionPath: `${paths.actionDir}/${plural}`,
          })
        ))
        .then(content => utils.write(`${containerPath}/${dirName}/${capitalize(plural)}.js`, content))
        .then(() => utils.success(
          `Container component ${name} successfully created! ==> "${containerPath}/${dirName}/${capitalize(plural)}.js"`
        ))
      .catch(utils.exit);
  })