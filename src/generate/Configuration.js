
import Node from './Node';


export default class Configuration extends Node {
  models = {};
  versions = {};
  currentVersion = null;
  acceptNodes = ['Api', 'Model'];
  routes = {};

  constructor(node) {
    super(node, null, true);
    this.loadBody();
    this.root = this;
  }

  addVersion(ver) {
    this.versions[ver.version] = ver;
    this.currentVersion = ver.version;
  }

  addModel(model) {
    this.models[model.name] = model;
  }

  addRoute(path, route) {
    const { method, controller, action } = route;
    const uniq = `${method} ${path}`;

    if (!controller) {
      throw new Error(`Route cannot be without controller: ${method} ${path}`);
    }

    this.routes[uniq] = {
      method,
      path,
      controller,
      action
    };
  }
}
