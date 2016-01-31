
import Node from './Node';


export default class Scope extends Node {
  routes = [];
  defaultController = null;
  target = '/';

  init() {
    if (this.node.target && this.node.target.path) {
      this.target = this.node.target.path;
    }
    console.log('init Scope', this.target);

    this.acceptNodes = ['Version', 'Scheme', 'Host', 'DefaultController', 'MediaType', 'Route', 'Scope'];
    this.loadBody();
  }

  addRoute(route) {
    console.error('ERROR: Routes is not realized!');
  }
}