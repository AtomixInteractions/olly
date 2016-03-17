
import Scope from './Scope';

export default class Api extends Scope {
  version = null;
  scheme = ['http'];
  mediaType = ['application/json'];

  init() {
    console.log('Init Api');
    this.acceptNodes = ['Version', 'DefaultController', 'MediaType', 'Route', 'Scope'];
    this.version = this.node.version;
    this.parent.addVersion(this);
    this.loadBody(this.acceptNodes);
  }

  setScheme(scheme) {
    this.scheme = scheme;
    console.info('Fix setter scheme!');
  }

  setMediaType(mt) {
    this.mediaType = mt;
    console.info('Fix setter mediaType!')
  }

  getVersionPath() {
    return '/v' + this.version;
  }

  addRoute(path, route) {
    this.installController(route);
    this.parent.addRoute(this.getVersionPath() + path, route);
  }
}
