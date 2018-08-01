import * as Utils from '../helpers/utils';
import transformServer from './../core/transform/server';
/**
 * merge config
 *
 * @export
 * @param {any} opts
 * @returns
 */
export default function mergeConfig(opts) {
  return Utils.merge(opts.config, {
    type: 'post',
    data: opts.data,
    baseUrl: transformServer(opts.baseUrl, opts.url)
  });
}
