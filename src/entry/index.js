import Command from '../core/command';
import defaultConfig from '../config';
import * as Utils from '../helpers/utils';
import mergeConfig from './mergeConfig';
import transformRequest from './../core/transform/request';
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
 * ajax method
 * @param {*} options
 */
sendjs.ajax = function(options) {
  return createEntry(
    //merge post request config
    Utils.merge(this.defaults, options)
  );
};
/**
 * post method
 * @param {string} url
 * @param {object} data
 */
sendjs.post = function(url = '', data = {}, config = {}) {
  return this.ajax(
    mergeConfig({
      baseUrl: this.defaults.baseUrl,
      url: url,
      data: data,
      config: config
    })
  );
};
/**
 * get method
 * @param {string} url
 * @param {object} data
 * @param {object} config
 */
sendjs.get = function(url = '', data = {}, config = {}) {
  return this.ajax(
    mergeConfig({
      baseUrl: this.defaults.baseUrl,
      url: url,
      data: data,
      config: config
    })
  );
};
/**
 * downClient method
 * @param {*} url
 * @param {*} data
 * @param {*} config
 */
sendjs.downClient = function(url = '', data = {}, config = {}) {
  const ajaxConfig = Utils.merge(
    this.defaults,
    mergeConfig({
      baseUrl: this.defaults.baseUrl,
      url: url,
      data: data,
      config: config
    })
  );
  window.open(`${ajaxConfig.baseUrl}${transformRequest(ajaxConfig)}`);
};
/**
 * upClient method
 * @param {*} url
 * @param {*} data
 * @param {*} config
 */
sendjs.upClient = function(url = '', data = {}, config = {}) {
  this.post(url, data, config);
};
export default sendjs;
