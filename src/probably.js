var probably = {};

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
