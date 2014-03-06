describe('range', function() {
  it('should return an array of consective values', function() {
    expect(probably.range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an empty array when endpoints are reversed', function() {
    expect(probably.range(10, 1)).toEqual([]);
  });

  it('should increment by the given step', function() {
    expect(probably.range(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
  });

  it('should return a decreasing sequence when step is negative', function() {
    expect(probably.range(10, 0, -3)).toEqual([10, 7, 4, 1]);
  });

  it('should step by 1 when the given step is zero', function() {
    expect(probably.range(1, 3, 0)).toEqual([1, 2, 3]);
  });
});

describe('sum', function() {
  it('should return the sum of a given sequence', function() {
    expect(probably.sum([1, 2, 3, 4])).toEqual(10);
  });

  it('should return 0 for an empty sequence', function() {
    expect(probably.sum([])).toEqual(0)
  });
});
