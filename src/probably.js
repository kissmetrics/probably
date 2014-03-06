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
 * Returns the minimum value from the given array.
 *
 * @param {number} xs
 * @return {number}
 */
probably.min = function(xs) {
  var min = null
  for (var i = 0; i < xs.length; i++)
    if (min === null || xs[i] < min)
      min = xs[i];
  return (min != null) ? min : Number.NaN;
};

/**
 * Returns the maximum value from the given array.
 *
 * @param {number} xs
 * @return {number}
 */
probably.max = function(xs) {
  var max = null
  for (var i = 0; i < xs.length; i++)
    if (max === null || xs[i] > max)
      max = xs[i];
  return (max != null) ? max : Number.NaN;
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
 * Returns the median of the given values.
 *
 * @param {Array.<number>} xs
 * @return {number}
 */
probably.median = function(xs) {
  var length = xs.length;
  if (length == 0)
    return Number.NaN;

  var middle = ((length / 2) - 1);
  if ((middle % 1) == 0)
    return ((xs[middle] + xs[middle + 1]) / 2);
  else
    return xs[Math.ceil(middle)];
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

/**
 * Returns a random number sampled uniformly from the given range.
 */
probably.randRange = function(min, max) {
  return ((Math.random() * (max - min)) + min);
};
