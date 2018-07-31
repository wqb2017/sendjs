import * as Utils from '../../helpers/utils';
/**
 * request baseUrl
 *
 * @export
 * @param {any} baseUrl
 * @param {any} url
 * @returns The formatted url
 */
export default function transformServer(baseUrl, url) {
  let serverUrl = baseUrl;
  if (url && Utils.isString(url)) {
    serverUrl += url;
  }
  serverUrl += serverUrl.indexOf('?') === -1 ? '?' : '&';
  return serverUrl;
}
