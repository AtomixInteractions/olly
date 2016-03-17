
import Node from './Node';


export default class Route extends Node {
  method = 'GET';
  path = '/';
  controller = null; // string
  action = null; // string

  init() {
    console.log('Init',
                this.node.method,
                this.node.condition.path,
                'to', this.node.condition.to.action,
                '@' + (this.node.condition.to.controller || ''));

    const { method, condition } = this.node;

    this.method = method;
    this.path = condition.path;
    if (condition.to.controller) {
      this.controller = condition.to.controller;
    }
    this.action = condition.to.action;

    this.parent.addRoute(this.path, this);
  }
}
