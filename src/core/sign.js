/**
 * request param key sort
 *
 * @export
 * @param {object} datas
 * @returns a=>z
 */
function keySort(reqs) {
  return Object.keys(reqs).sort(function(a, b) {
    return a.split('=')[0] > b.split('=')[0] ? 1 : -1;
  });
}
/**
 * sign
 *
 * @export
 * @param {any} opts
 * @returns {string}
 */
export default function sign(opts) {
  const reqs = opts.data;
  let keyArr = keySort(reqs);
  let _sg = [];
  for (let i = 0; i < keyArr.length; i++) {
    _sg.push(keyArr[i] + '=' + reqs[keyArr[i]]);
  }
  return _sg.join('&') + '&=requestKey' + opts.requestKey;
}
