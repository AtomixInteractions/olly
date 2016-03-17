

import Node from './Node';

export default class DefaultController extends Node {
  init() {
    console.log('Init DefaultController ', this.node.controller);
    this.parent.setDefaultController(this.node.controller);
  }
}
