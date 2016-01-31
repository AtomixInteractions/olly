


import Node from './Node';

export default class Route extends Node {
  init() {
    console.log('Init',
                this.node.method,
                this.node.condition.path,
                'to', this.node.condition.to.action,
                '@' + (this.node.condition.to.controller || ''));
  }
}

