
import Node from './Node';


export default class Scope extends Node {
  routes = [];
  defaultController = null;
  target = '/';

  init() {
    if (this.node.target && this.node.target.path) {
      this.target = this.node.target.path;
    }
    console.log('Init Scope', this.target);

    if (this.node.target.controller) {
      this.defaultController = this.node.target.controller;
    }

    this.acceptNodes = ['Version', 'Scheme', 'Host', 'DefaultController', 'MediaType', 'Route', 'Scope'];
    this.loadBody();
  }

  installController(route) {
    if (this.defaultController && !route.controller) {
      route.controller = this.defaultController;
    }
  }

  setDefaultController(ctrl) {
    this.defaultController = ctrl;
  }

  addRoute(path, route) {
    this.installController(route);
    this.parent.addRoute(this.target + path, route);
  }
}
