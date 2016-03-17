
import 'nonstandard';
import { EventEmitter } from 'events';
import Debug from 'debug';
import HTTP from 'http';
import { resolve } from 'path';
import HttpMethods from 'methods';
import { readFileSync } from 'fs';
import Express from 'express';

import { parse as ParseConfig } from './olly';
import * as Generate from './generate/';

const debug = Debug('olly:application');


export class Application {
  exp = null
  configuration = {};
  map = {};

  constructor() {
    this.exp = Express();
  }

  controller(name, ctrl) {
    this.map[name] = ctrl;
  }

  loadConfiguration(configFile) {
    debug('loding configuration %s file', configFile);
    const configContent = readFileSync(configFile, 'utf8');
    const config = ParseConfig(configContent);

    debug(config);

    this.configuration = Generate.load(config);
    console.log(this.configuration);
  }

  /**
   * Add routes to app
   */
  installRoutes() {
    console.log(this.configuration.routes);
    for (const name in this.configuration.routes) {
      const { method, path, controller, action } = this.configuration.routes[name];
      const controllerObject = this.map[controller];

      if (!controllerObject) {
        throw new Error(`Controller "${controller}" not found`);
      }
      if (!controllerObject[action]) {
        throw new Error(`Action "${action}" not found in controller "${controller}"`);
      }

      this.exp[method.toLowerCase()](path, controllerObject[action]);
    }
  }

  listen(port, callback = () => {}) {
    this.installRoutes();
    this.exp.listen(port, callback);
  }
}