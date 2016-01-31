
import * as NodeList from './list';
export { NodeList };

/**
 *
 * @param  {Object} configObject Configuration object
 * @return {Configuration}
 */
export function load(configObject) {
  if (typeof configObject !== 'object' || Array.isArray(configObject)) {
    throw new TypeError('Configuration must be Object and parsed from config!');
  }

  if (configObject.type !== 'Configuration') {
    throw new Error('First node in configuration must be `Configuration`');
  }

  return new NodeList['Configuration'](configObject);
}


/**
 *
 * @param  {String} nodeName
 * @return {Node}
 */
export function getNode(nodeName) {
  if (typeof nodeName !== 'string') {
    throw new TypeError('Node name must be a string!');
  }

  if (typeof NodeList[nodeName] !== 'function') {
    throw new TypeError(`Node "${nodeName}" is not defined!`);
  }

  return NodeList[nodeName];
}
