"use strict";

/**
 * Takes a number of iterators and returns a new iterator which emits an array
 * of each of the iterators next values. Stops when the shortest iterator is
 * exhausted.
 *
 * @param {...Iterator} var_args
 * @return {Iterator}
 */

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = zipIterator;
var marked0$0 = [zipIterator].map(_regeneratorRuntime.mark);

function zipIterator() {
  var varArgs,
    length,
    done,
    nextZip,
    i,
    next,
    args$1$0 = arguments;
  return _regeneratorRuntime.wrap(
    function zipIterator$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            varArgs = args$1$0;
            length = varArgs.length;

          case 2:
            if (!true) {
              context$1$0.next = 21;
              break;
            }

            done = false;
            nextZip = new Array(length);
            i = 0;

          case 6:
            if (!(i < length)) {
              context$1$0.next = 15;
              break;
            }

            next = varArgs[i].next();

            if (!next.done) {
              context$1$0.next = 11;
              break;
            }

            done = true;
            return context$1$0.abrupt("break", 15);

          case 11:
            nextZip[i] = next.value;

          case 12:
            i++;
            context$1$0.next = 6;
            break;

          case 15:
            if (!done) {
              context$1$0.next = 17;
              break;
            }

            return context$1$0.abrupt("break", 21);

          case 17:
            context$1$0.next = 19;
            return nextZip;

          case 19:
            context$1$0.next = 2;
            break;

          case 21:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[0],
    this
  );
}

module.exports = exports["default"];

// TODO: Use rest parameter once 6to5 is fixed (2.0)
