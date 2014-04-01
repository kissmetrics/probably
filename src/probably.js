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
probably._betaPDF = function(a, b) {
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
probably.normPDF = function(mean, sd) {
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
 * b` meet or exceed a threshold.
 *
 * @param {number} a
 * @param {number} b
 * @return {function(number):number}
 */
probably.betaPDF = function(a, b) {
  if ((a + b) < 1000)
    return probably._betaPDF(a, b);
  else {
    var mean = probably.meanBeta(a, b);
    var sd = probably.sdBeta(a, b);
    return probably.normPDF(mean, sd);
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
 * @param {number=} maxIters Optional maximum number of times to attempt
 *                           sampling (defaults to 10000)
 * @return {?number} Sampled value or null if the iteration threshold was met
 *                   before drawing a valid sample
 */
probably.rejectionSample = function(f, xMin, xMax, yMax, maxIters) {
  maxIters = 10000;

  for (var i = 0; i < maxIters; i++) {
    var x = probably.randRange(xMin, xMax);
    var y = probably.randRange(0, yMax);
    if (y <= f(x))
      return x;
  }

  return null;
};

/**
 * Returns a function to sample values from the specified Beta distribution.
 *
 * @param {number} n Number of samples to return
 * @param {number} a
 * @param {number} b
 * @return {function():number}
 */
probably.betaSampler = function(a, b) {
  var pdf = probably.betaPDF(a, b);

  // Optimize sampling by constrain the sampling space to `x` within Z=8 of
  // the mean, and `y` less than the distribution's maximum.
  var distMean = probably.meanBeta(a, b);
  var distSD = probably.sdBeta(a, b);
  var xMin = Math.max((distMean - (8 * distSD)), 0);
  var xMax = Math.min((distMean + (8 * distSD)), 1);
  var yMax = pdf(distMean);

  return function() {
    return probably.rejectionSample(pdf, xMin, xMax, yMax);
  };
};

/**
 * Returns a summary of the improvement between two trials.
 *
 * @param {number} a1 Alpha for the first Beta distribution
 * @param {number} b1 Beta for the first Beta distribution
 * @param {number} a2 Alpha for the second Beta distribution
 * @param {number} b2 Beta for the second Beta distribution
 * @param {number=} sampleCount Number of samples to take; defaults to 100000
 * @return {Object}
 */
probably.improvement = function(a1, b1, a2, b2, sampleCount) {
  sampleCount = sampleCount || 100000;

  var sampler1 = probably.betaSampler(a1, b1);
  var samples1 = probably.collectn(sampleCount, sampler1);

  var sampler2 = probably.betaSampler(a2, b2);
  var samples2 = probably.collectn(sampleCount, sampler2);

  var improvementCount = 0;
  var diffs = [];
  for (var i = 0; i < sampleCount; i++) {
    var s1 = samples1[i], s2 = samples2[i];
    if (s1 > s2)
      improvementCount++;
    var diff = ((s1 / s2) - 1);
    diffs.push(diff);
  }

  return {
    prob: (improvementCount / sampleCount),
    mean: probably.mean(diffs),
    sd: probably.sd(diffs)
  };
};
