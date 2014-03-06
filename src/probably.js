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
 * Call the given function the specified number of times, and return an array
 * of its return values.
 *
 * @param {number} n
 * @param {function():number} f
 * @return {Array.<number>}
 */
probably.collectn = function(n, f) {
  var values = [];
  for (var i = 0; i < n; i++)
    values.push(f());
  return values;
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

/**
 * Calculates the Euler beta function for the given integer parameters.
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
probably.beta = function(a, b) {
  var total = 1;
  for (var i = 0; i < a; i++) {
    var n = (i > 0) ? i : 1;
    var d = (b + i);
    total *= (n / d);
  }
  return total;
};

/**
 * Returns the mean of the Beta distribution with the specified parameters.
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
probably.meanBeta = function(a, b) {
  return (a / (a + b));
};

/**
 * Returns the standard deviation of the Beta distribution.
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
probably.sdBeta = function(a, b) {
  var mean = probably.meanBeta(a, b);
  return Math.sqrt((mean * (1 - mean)) / (a + b + 1));
};

/**
 * Returns a probably density function for the Beta distribution with the
 * specified parameters.
 *
 * @param {number} a
 * @param {number} b
 * @return {function(number):number}
 */
probably.makeBetaPDF = function(a, b) {
  var denom = probably.beta(a, b);
  return function(x) {
    var numer = (Math.pow(x, (a - 1)) * Math.pow((1 - x), (b - 1)));
    return (numer / denom);
  };
};

/**
 * Returns a probably distribution function for the specified normal
 * distribution.
 *
 * @param {number} mean
 * @param {number} sd
 * @return {function(number):number}
 */
probably.makeNormPDF = function(mean, sd) {
  var denom = (sd * Math.sqrt(2 * Math.PI));
  var varianceTimesTwo = 2 * (sd * sd);
  return function(x) {
    var diff = (x - mean);
    var numer = Math.exp(-(diff * diff) / varianceTimesTwo);
    return (numer / denom);
  };
};

/**
 * Returns either the Beta distribution, or its normal approximation if `a +
 * b` meet or exceed a threshold of 1000.
 */
probably.makeBetaOrNormPDF = function(a, b) {
  if ((a + b) < 1000)
    return probably.makeBetaPDF(a, b);
  else {
    var mean = probably.meanBeta(a, b);
    var sd = probably.sdBeta(a, b);
    return probably.makeNormPDF(mean, sd);
  }
};

/**
 * Returns a random value from the domain of the given function using the
 * rejection sampling algorithm.
 *
 * @param {function(number):number} f Function from which to sample
 * @param {number} xMin Lower bound of the domain to search
 * @param {number} xMax Upper bound of the domain to search
 * @param {number} yMax Maximum value of the range to search
 * @return {number}
 */
probably.rejectionSample = function(f, xMin, xMax, yMax) {
  while (true) {
    var x = probably.randRange(xMin, xMax);
    var y = probably.randRange(0, yMax);
    if (y < f(x))
      return x;
  }
};
