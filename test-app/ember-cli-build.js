'use strict';

const fs = require('fs');
const path = require('path');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const mergeTrees = require('broccoli-merge-trees');

// The docs site lives in `docs-app` and is only built when ember-cli-addon-docs is
// installed (see the ember-default-docs scenario). Without it, the app contains just the
// scenarios, so it does not reference components the addon would provide.
const DOCS_INSTALLED = Object.keys(require('./package.json').devDependencies).includes(
  'ember-cli-addon-docs'
);

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    trees: {
      app: DOCS_INSTALLED ? mergeTrees(['app', 'docs-app'], { overwrite: true }) : 'app',
    },
    'ember-cli-addon-docs': {
      // The docs describe ember-table. addon-docs finds it by matching the path of the addon
      // this app uses, which is the injected copy of ../addon rather than the folder itself.
      documentingAddonAt: DOCS_INSTALLED
        ? fs.realpathSync(path.join(__dirname, 'node_modules', 'ember-table'))
        : undefined,
      addonSrcFolder: 'src',
    },
    'ember-cli-babel': {
      includePolyfill: false,
    },
    babel: {
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-optional-catch-binding',
        '@babel/plugin-transform-class-static-block',
      ],
    },
    'ember-faker': {
      /* Always enable for the test app because the docs examples use faker */
      enabled: true,
    },
  });

  /*
    This build file specifies the options for the test app of this addon.
    It does *not* influence how the addon or the app using it behave. You most
    likely want to be modifying `addon/index.js` or the consuming app's build file.
  */

  let { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
