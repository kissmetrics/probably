var probably = {};

/**
 * Returns a sequence of consecutive integers.
 *
 * @param {number} start Minimum value in the sequence
 * @param {number} stop Maximum value in the sequence, which is included in
 *                      the sequence
 * @param {number=} step Optional difference between each consecutive value,
 *                       defaulting to 1
 */
probably.range = function(start, stop, step) {
  step = step || 1;
  var seq = [];
  if (step > 0) {
    for (var i = start; i <= stop; i += step)
      seq.push(i);
  } else if (step < 0) {
    for (var i = start; i >= stop; i += step)
      seq.push(i);
  }
  return seq;
};

/**
 * Returns the sum of the given values.
 *
 * @param {Array.<number>} xs
 * @return {number}
 */
probably.sum = function(xs) {
  var total = 0;
  for (var i = 0; i < xs.length; i++)
    total += xs[i];
  return total;
};

/**
 * Calculates the arithmetic mean of the given values.
 *
 * @param {Array.<number>} xs
 * @return {number}
 */
probably.mean = function(xs) {
  var length = xs.length;
  return (length > 0) ? (probably.sum(xs) / length) : Number.NaN;
};

/**
 * Calculates the variance of the given values.
 *
 * @param {Array.<number>} xs
 * @return {number}
 */
probably.variance = function(xs) {
  var length = xs.length;
  if (length == 0)
    return Number.NaN;

  var mean = probably.mean(xs);
  var total = 0;
  for (var i = 0; i < length; i++) {
    var diff = (xs[i] - mean);
    total += (diff * diff);
  }

  return (total / length);
};

/**
 * Returns the standard deviation of the given values.
 *
 * @param {Array.<number>} xs
 * @return {number}
 */
probably.sd = function(xs) {
  return Math.sqrt(probably.variance(xs));
};
