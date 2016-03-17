
import Mixin from 'merge-descriptors';
import { Application } from './application';


module.exports = function create(config) {
  const app = new Application();
  app.loadConfiguration(config);
  return app;
}




