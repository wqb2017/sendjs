import * as Utils from '../helpers/utils';
import initMixin from './init';
let id = 0;
/**
 * create Command
 *
 * @export
 * @param {any} options
 */
export default function Command(options) {
  if (!(this instanceof Command)) {
    Utils.logError('Command is a constructor and should be called with the `new` keyword');
  }
  this.$id = id++;
  return this._init(options);
}
initMixin(Command);
