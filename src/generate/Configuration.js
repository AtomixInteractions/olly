
import Node from './Node';


export default class Configuration extends Node {
  models = {};
  versions = {};
  acceptNodes = ['Api', 'Model'];
  routes = [];


  constructor(node) {
    super(node, null, true);
    this.loadBody();
  }

  addVersion(ver) {
    this.versions[ver.version] = ver;
  }

  addModel(model) {
    this.models[model.name] = model;
  }

  addRoute(route) {
    console.error('ERROR: Routers is not realised!')
  }
}
