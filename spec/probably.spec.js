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

describe('min', function() {
  it('should return the minimum value from the given values', function() {
    expect(probably.min([5, 4, 2, 3, 1, 9])).toEqual(1);
  });

  it('should return NaN when given an empty array of values', function() {
    expect(isNaN(probably.min([]))).toBe(true);
  });
});

describe('max', function() {
  it('should return the maximum value from the given values', function() {
    expect(probably.max([5, 4, 2, 9, 3, 1])).toEqual(9);
  });

  it('should return NaN when given an empty array of values', function() {
    expect(isNaN(probably.max([]))).toBe(true);
  });
});

describe('sum', function() {
  it('should return the sum of the given values', function() {
    expect(probably.sum([1, 2, 3, 4])).toEqual(10);
  });

  it('should return 0 for an empty array of values', function() {
    expect(probably.sum([])).toEqual(0)
  });
});

describe('mean', function() {
  it('should return the mean of the given values', function() {
    expect(probably.mean([5, 10, 15, 20, 25, 30])).toEqual(17.5);
  });

  it('should return NaN when given an empty array of values', function() {
    expect(isNaN(probably.mean([]))).toBe(true);
  });
});

describe('median', function() {
  it('should return the middle value when the length is odd', function() {
    expect(probably.median([1, 2, 3, 4, 5])).toEqual(3);
  });

  it('should return the mean of the middle values when the length is even', function() {
    expect(probably.median([1, 2, 3, 4, 5, 6])).toEqual(3.5);
  });

  it('should return NaN when given an empty array', function() {
    expect(isNaN(probably.median([]))).toBe(true);
  });
});

describe('variance', function() {
  it('should return the variance of the given values', function() {
    expect(probably.variance([10, 20, 50, 100])).toEqual(1225);
  });

  it('should return NaN when given an empty array of values', function() {
    expect(isNaN(probably.variance([]))).toBe(true);
  });
});

describe('sd', function() {
  it('should return the standard deviation of the given values', function() {
    expect(probably.sd([4, 5, 5, 4, 4, 2, 2, 6])).toEqual(Math.sqrt(1.75));
  });

  it('should return NaN when given an empty array of values', function() {
    expect(isNaN(probably.sd([]))).toBe(true);
  });
});

describe('randRange', function() {
  var values;
  beforeEach(function() {
    values = [];
    for (var i = 0; i < 100; i++)
      values.push(probably.randRange(5, 10));
  });

  it('should return random numbers within the given range', function() {
    for (var i = 0; i < values.length; i++)
      expect(values[i] >= 5 && values[i] <= 10).toBe(true);
  });
});

describe('beta', function() {
  it('should calculate the beta function for integer arguments', function() {
    expect(probably.beta(10, 23)).toBeCloseTo(1.5500934396325411e-9, 20);
  });
});

describe('meanBeta', function() {
  it('should return the mean of the Beta distribution', function() {
    expect(probably.meanBeta(10, 23)).toEqual(10 / 33);
  });
});

describe('sdBeta', function() {
  it('should return the standard deviation of the Beta distribution', function() {
    expect(probably.sdBeta(10, 23)).toBeCloseTo(0.07881529757, 10);
  });
});

describe('makeBetaPDF', function() {
  var pdf;
  beforeEach(function() {
    pdf = probably.makeBetaPDF(10, 23);
  });

  it('should return a PDF for the specified Beta distribution', function() {
    expect(pdf(0)).toEqual(0);
    expect(pdf(0.1)).toBeCloseTo(0.0635298, 5);
    expect(pdf(0.25)).toBeCloseTo(4.38985, 5);
    expect(pdf(0.5)).toBeCloseTo(0.300409, 5);
    expect(pdf(0.75)).toBeCloseTo(2.7534277373744698e-6, 5);
    expect(pdf(1)).toEqual(0);
  });
});
