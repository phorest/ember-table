import { isArray } from '@ember/array';
import { assert } from '@ember/debug';

/**
  Genericizes `objectAt` so it can be run against a normal array or an Ember array

  @param {object|Array} arr
  @param {number} index
  @return {any}
*/
function objectAt(arr, index) {
  assert('arr must be an instance of a Javascript Array or implement `objectAt`', isArray(arr) || typeof arr.objectAt === 'function');
  if (typeof arr.objectAt === 'function') {
    return arr.objectAt(index);
  }
  return arr[index];
}
function splice(items, start, count, ...add) {
  if (typeof items.replace === 'function' && typeof items.objectAt === 'function') {
    return items.replace(start, count, add);
  }
  return items.splice(start, count, ...add);
}

/**
 * Cycle shift an internal [start..end] to [start + 1...end, start].
 */
function move(items, start, end) {
  let sourceItem = objectAt(items, start);
  splice(items, start, 1);
  splice(items, end, 0, sourceItem);
}

export { move, objectAt, splice };
//# sourceMappingURL=array.js.map
