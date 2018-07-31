import sign from '../sign';
import Md5 from '../../helpers/md5';
import * as Utils from '../../helpers/utils';
/**
 * The formatted Request
 */
export default function transformRequest(opts) {
  if (opts.requestKey) {
    opts.data['sign'] = Md5(sign(opts));
  }
  let reqs = opts.data;
  let reqArr = [];
  for (let variable in reqs) {
    if (reqs.hasOwnProperty(variable)) {
      //filter undefined|null
      if (reqs[variable] == undefined || reqs[variable] == null) {
        Utils.logWarn(`${variable} value is reqs[variable]`);
      }
      reqArr.push(Utils.encodeValue(variable) + '=' + Utils.encodeValue(reqs[variable]));
    }
  }
  return reqArr.join('&');
}
