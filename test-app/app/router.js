import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('scenarios', function() {
    this.route('simple');
    this.route('performance');
    this.route('blank');
  });

  this.route('not-found', { path: '/*path' });
});

export default Router;
