
import 'nonstandard';
import { EventEmitter } from 'events';
import Debug from 'debug';
import HTTP from 'http';
import { resolve } from 'path';
import HttpMethods from 'methods';
import { readFileSync } from 'fs';

import { parse as ParseConfig } from './olly';
import * as Generate from './generate/';

const debug = Debug('olly:application');


export class Application extends EventEmitter {

  cache = {};
  engines = {};
  settings = {};
  locals = {};
  mountpath = '/';
  configuration = {};

  constructor() {
    super();

    this.defaultConfiguration();
  }


  defaultConfiguration() {
    const env = process.env.NODE_ENV || 'development';

    this.enable('x-powered-by');
    this.set('env', env);

    debug('booting in %s mode', env);

    this.on('mount', (parent) => {
      debug('Mounting');
    });

    this.locals = Object.create(null);
    this.locals.settings = this.settings;

  }


  loadConfiguration(configFile) {
    debug('loding configuration %s file', configFile);
    const configContent = readFileSync(configFile, 'utf8');
    const config = ParseConfig(configContent);

    debug(config);

    this.configuration = Generate.load(config);
  }


  set(setting, value) {
    this.settings[setting] = value;
    return this;
  }


  enabled(setting) {
    return Boolean(this.settings[setting]);
  }


  disabled(setting) {
    return !(this.settings[setting]);
  }


  enable(setting) {
    return this.set(setting, true);
  }


  disable(setting) {
    return this.set(setting, false);
  }


  handle(req, res) {

  }
}