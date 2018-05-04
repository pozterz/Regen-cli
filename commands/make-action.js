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
  .command('makeaction <name>')
  .action((name, options) => {
    const plural = lowercase(name + 's')
    const fileName = `${lowercase(kebab(plural))}.js`;
    const dirName = `${capitalize(plural)}`

    const containerPath = path.join(
      paths.baseDir,
      paths.src,
      paths.containerDir
    );

    console.log(containerPath)

    const insertPath = path.join(
      paths.src,
      paths.actionDir,
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"makeaction" insert path does not exist.'
    );

    utils.info(`Creating state "${name}"...`);

    utils.exists(`${insertPath}${fileName}`)
      .then(() => utils.exit(
        `State folder with name "${fileName}" already exists.`
      ))
      .catch(() => utils.read(paths.actionStub, 'utf8'))
      .then(content => {
        const actionType = ["GET", "ADD","UPDATE","DELETE"]
          .map(action => `${name}_${action}`)
          .map(snakeCase)
          .map(uppercase);

        const actionTypes = ["GET", "ADD","UPDATE","DELETE"]
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

  })