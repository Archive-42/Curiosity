"use strict";

/**
 * Implements Python's range function, returns an iterator.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} opt_start Number to start from
 * @param {?number=} opt_end Number to count to
 * @param {?number=} opt_step Step size
 * @return {!Iterator}
 */

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = genRange;
var marked0$0 = [genRange].map(_regeneratorRuntime.mark);

function genRange(optStart, optEnd, optStep) {
  var negative, i;
  return _regeneratorRuntime.wrap(
    function genRange$(context$1$0) {
      while (1)
        switch ((context$1$0.prev = context$1$0.next)) {
          case 0:
            if (!(optStart == null)) {
              context$1$0.next = 4;
              break;
            }

            return context$1$0.abrupt("return");

          case 4:
            if (!(optEnd == null)) {
              context$1$0.next = 10;
              break;
            }

            optEnd = optStart;
            optStart = 0;
            optStep = 1;
            context$1$0.next = 16;
            break;

          case 10:
            if (!(optStep == null)) {
              context$1$0.next = 14;
              break;
            }

            optStep = 1;
            context$1$0.next = 16;
            break;

          case 14:
            if (!(optStep === 0)) {
              context$1$0.next = 16;
              break;
            }

            throw new RangeError("opt_step can't be 0");

          case 16:
            negative = optStep < 0;
            i = optStart;

          case 18:
            if (!((negative && i > optEnd) || (!negative && i < optEnd))) {
              context$1$0.next = 24;
              break;
            }

            context$1$0.next = 21;
            return i;

          case 21:
            i += optStep;
            context$1$0.next = 18;
            break;

          case 24:
          case "end":
            return context$1$0.stop();
        }
    },
    marked0$0[0],
    this
  );
}

module.exports = exports["default"];
