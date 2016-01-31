
import Node from './Node';

export default class Model extends Node {
  props = [];
  request = [];
  response = [];
  name = null;

  init() {
    this.name = this.node.name;
    console.log('Init Model', this.name);
    this.parent.addModel(this);
  }
}
