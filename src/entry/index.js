import Command from '../core/command';
import defaultConfig from '../config';
import * as Utils from '../helpers/utils';
import transformServer from '../core/transform/server';
let sendjs = {};
/**
 * create entry
 *
 * @export
 * @param {any} config
 * @returns
 */
export function createEntry(config) {
  return new Command(config);
}
/**
 * default params
 * @param {object} config
 */
sendjs.defaults = defaultConfig;
/**
 * create default params
 * @param {object} options
 */
sendjs.create = function(options) {
  this.defaults = Utils.merge(defaultConfig, options);
};
/**
 * ajax
 * @param {*} options
 */
sendjs.ajax = function(options) {
  return createEntry(
    //merge post request config
    Utils.merge(this.defaults, options)
  );
};
/**
 * post
 * @param {string} url
 * @param {object} data
 */
// sendjs.post = function(url, data) {
sendjs.post = function(url = '', data = {}, config = {}) {
  return this.ajax(
    Utils.merge(config, {
      type: 'post',
      data: data,
      baseUrl: transformServer(this.defaults.baseUrl, url)
    })
  );
};
sendjs.get = function(url = '', data = {}, config = {}) {
  return this.ajax(
    Utils.merge(config, {
      type: 'get',
      data: data,
      baseUrl: transformServer(this.defaults.baseUrl, url)
    })
  );
};
export default sendjs;
