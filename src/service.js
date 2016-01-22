
import { parse } from './olly';

export default class Olly {
  constructor() {
    this.demo = 'Not implemented!';
    this.d = 'api 0 { controller demo; }';
  }

  parse() {
    console.log(parse(this.d));
  }
}
