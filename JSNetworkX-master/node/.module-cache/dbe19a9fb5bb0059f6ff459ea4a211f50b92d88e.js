"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var _interopRequireDefault =
  require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = genPermutations;
var marked0$0 = [genPermutations].map(_regeneratorRuntime.mark);

var _range = require("./range");

var _range2 = _interopRequireDefault(_range);

/**
 * Implements Python's itertools.permutations
 *
 * Return successive r length permutations of elements in the iterable.
 * *
 * @param {Iterable} iterable
 * @param {number=} opt_r
 *
 * @return {Iterator}
 */

function genPermutations(iterable, r) {
  var pool, n, indicies, cycles, rangeR, k, i, index, j;
  return _regeneratorRuntime.wrap(
    function genPermutations$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            pool = _Array$from(iterable);
            n = pool.length;

            r = r == null ? n : r;

            if (!(r > n)) {
              context$1$0.next = 5;
              break;
            }

            return context$1$0.abrupt("return");

          case 5:
            indicies = (0, _range2["default"])(n);
            cycles = (0, _range2["default"])(n, n - r, -1);
            rangeR = (0, _range2["default"])(r - 1, -1, -1);
            context$1$0.next = 10;
            return indicies.slice(0, r).map(function (i) {
              return pool[i];
            });

          case 10:
            if (!true) {
              context$1$0.next = 35;
              break;
            }

            k = 0;

          case 12:
            if (!(k < rangeR.length)) {
              context$1$0.next = 31;
              break;
            }

            i = rangeR[k];

            cycles[i] -= 1;
            index = indicies[i];

            if (!(cycles[i] === 0)) {
              context$1$0.next = 22;
              break;
            }

            indicies.splice(i, 1);
            indicies.push(index);
            cycles[i] = n - i;
            context$1$0.next = 28;
            break;

          case 22:
            j = cycles[i];

            indicies[i] = indicies[indicies.length - j];
            indicies[indicies.length - j] = index;
            /* eslint-disable no-loop-func */
            context$1$0.next = 27;
            return indicies.slice(0, r).map(function (i) {
              return pool[i];
            });

          case 27:
            return context$1$0.abrupt("break", 31);

          case 28:
            k++;
            context$1$0.next = 12;
            break;

          case 31:
            if (!(rangeR.length === k)) {
              context$1$0.next = 33;
              break;
            }

            return context$1$0.abrupt("return");

          case 33:
            context$1$0.next = 10;
            break;

          case 35:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[0],
    this
  );
}

module.exports = exports["default"];

// genPermutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
// genPermutations(range(3)) --> 012 021 102 120 201 210

/* eslint-enable no-loop-func */
