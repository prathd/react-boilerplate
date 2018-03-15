const nodePlop = require('node-plop');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

const xmark = require('./helpers/xmark');

process.chdir(path.join(__dirname, '../generators'));

const prettyStringify = (data) => JSON.stringify(data, null, 2);

const checkForErrors = (result) => {
  if (Array.isArray(result.failures) && result.failures.length > 0) {
    throw result.failures;
  }
};

const reportErrorsFor = (title) => (err) => {
  // TODO Replace with our own helpers/log that is guaranteed to be blocking?
  xmark(() => console.error(chalk.red(` ERROR generating '${title}': `), prettyStringify(err)));
  process.exit(1);
};

// Generated tests are designed to fail, which would in turn fail CI builds
const removeTestsDirFrom = (relativePath) => () => rimraf.sync(path.join(__dirname, '/../../app/', relativePath, '/tests'));

const plop = nodePlop('./index');

const componentGen = plop.getGenerator('component');
componentGen.runActions({ name: 'GeneratedComponentEsclass', type: 'React.Component', wantLoadable: true, })
  .then(checkForErrors)
  .then(removeTestsDirFrom('components/GeneratedComponentEsclass'))
  .catch(reportErrorsFor('component/React.Component'));

componentGen.runActions({ name: 'GeneratedComponentEsclasspure', type: 'React.PureComponent', wantLoadable: true })
  .then(checkForErrors)
  .then(removeTestsDirFrom('components/GeneratedComponentEsclasspure'))
  .catch(reportErrorsFor('component/React.PureComponent'));

componentGen.runActions({ name: 'GeneratedComponentStatelessfunction', type: 'Stateless Function', wantLoadable: true })
  .then(checkForErrors)
  .then(removeTestsDirFrom('components/GeneratedComponentStatelessfunction'))
  .catch(reportErrorsFor('component/Stateless Function'));

const containerGen = plop.getGenerator('container');
containerGen.runActions({
  name: 'GeneratedContainerPureComponent',
  type: 'React.PureComponent',
  wantHeaders: true,
  wantActionsAndReducer: true,
  wantSagas: true,
  wantLoadable: true,
})
  .then(checkForErrors)
  .then(removeTestsDirFrom('containers/GeneratedContainerPureComponent'))
  .catch(reportErrorsFor('container/React.PureComponent'));

containerGen.runActions({
  name: 'GeneratedContainerComponent',
  type: 'React.Component',
  wantHeaders: true,
  wantActionsAndReducer: true,
  wantSagas: true,
  wantLoadable: true,
})
  .then(checkForErrors)
  .then(removeTestsDirFrom('containers/GeneratedContainerComponent'))
  .catch(reportErrorsFor('container/React.Component'));

containerGen.runActions({
  name: 'GeneratedContainerStateless',
  type: 'Stateless Function',
  wantHeaders: true,
  wantActionsAndReducer: true,
  wantSagas: true,
  wantLoadable: true,
})
  .then(checkForErrors)
  .then(removeTestsDirFrom('containers/GeneratedContainerStateless'))
  .catch(reportErrorsFor('container/Stateless'));

const languageGen = plop.getGenerator('language');
languageGen.runActions({ language: 'fr' })
  .catch(reportErrorsFor('language'));
