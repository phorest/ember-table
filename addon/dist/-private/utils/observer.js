import { assert } from '@ember/debug';
import { observer as observer$1 } from '@ember/object';
import { addObserver as addObserver$1, removeObserver as removeObserver$1 } from '@ember/object/observers';

function observer(...args) {
  let fn = args.pop();
  let dependentKeys = args;
  let sync = false;

  // eslint-disable-next-line ember/no-observers
  return observer$1({
    dependentKeys,
    fn,
    sync
  });
}
function addObserver(...args) {
  let obj, path, target, method;
  let sync = false;
  obj = args[0];
  path = args[1];
  assert(`Expected 3 or 4 args for addObserver, got ${args.length}`, args.length === 3 || args.length === 4);
  if (args.length === 3) {
    target = null;
    method = args[2];
  } else if (args.length === 4) {
    target = args[2];
    method = args[3];
  }

  // eslint-disable-next-line ember/no-observers
  return addObserver$1(obj, path, target, method, sync);
}
function removeObserver(...args) {
  let obj, path, target, method;
  let sync = false;
  obj = args[0];
  path = args[1];
  assert(`Expected 3 or 4 args for addObserver, got ${args.length}`, args.length === 3 || args.length === 4);
  if (args.length === 3) {
    target = null;
    method = args[2];
  } else {
    target = args[2];
    method = args[3];
  }
  return removeObserver$1(obj, path, target, method, sync);
}

export { addObserver, observer, removeObserver };
//# sourceMappingURL=observer.js.map
