'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
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
