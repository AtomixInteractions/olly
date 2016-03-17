
import { getNode } from './index';
import Debug from 'debug';

const debug = Debug(`olly:generate`);


export default class Node {
  parent = null;
  node = null;
  root = null;
  acceptNodes = [];

  constructor(node, parent, skipCheck = false) {
    if (skipCheck) {
      if (typeof node !== 'object' || typeof parent !== 'object')
        throw new TypeError('Node or Parent must be Nodes!');
    }

    this.node = node;
    this.parent = parent;
    if (parent) {
      this.root = parent.root;
    }
    else {
      this.root = parent;
    }
    this.init();
  }

  init() {
    debug(`Init ${this.constructor.name}`);
    // child node code
  }

  checkNode({ type }) {
    if (!this.acceptNodes.includes(type)) {
      throw new Error(`${this.constructor.name} not accept node "${type}"!`)
    }
    return true;
  }

  loadBody(acceptNodes) {
    if (!Array.isArray(this.node.body)) {
      throw new TypeError('Configuration must define `body`!');
    }

    if (acceptNodes) {
      this.acceptNodes = acceptNodes;
    }

    this.node.body.forEach((node) => {
      this.checkNode(node);

      const Child = getNode(node.type);
      Child.create(node, this);
    });
  }

  static create(node, parent, skipCheck = false) {
    return new this(node, parent, skipCheck);
  }
}
