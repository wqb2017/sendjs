import transformRequest from './transform/request';
import createHttpRequest from './../server/http';
/**
 * init Command info
 *
 * @export
 * @param {any} cmd
 */
export default function initMixin(cmd) {
  return cmd.prototype._init = function(opts) {
    return createHttpRequest({
      baseUrl: opts.baseUrl,
      type: opts.type.toUpperCase(),
      async: opts.async,
      header: opts.header,
      success: opts.success,
      error: opts.error,
      data: transformRequest(opts)
    });
  };
}
