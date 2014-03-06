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
 * Returns the sum of the given sequence.
 *
 * @param {Array.<number>} seq
 * @return {number}
 */
probably.sum = function(seq) {
  var total = 0;
  for (var i = 0; i < seq.length; i++)
    total += seq[i];
  return total;
};

/**
 * Calculates the arithmetic mean of the given sequence.
 *
 * @param {Array.<number>} seq
 * @return {number}
 */
probably.mean = function(seq) {
  var length = seq.length;
  return (length > 0) ? (probably.sum(seq) / length) : Number.NaN;
};
