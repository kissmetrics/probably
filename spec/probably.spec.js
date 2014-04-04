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

describe('collectn', function() {
  var f;
  beforeEach(function() {
    var i = 1;
    f = function() {
      return (i *= 2);
    };
  });

  it('should return an array of return values from the given function', function() {
    expect(probably.collectn(8, f)).toEqual([2, 4, 8, 16, 32, 64, 128, 256]);
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

describe('_betaPDF', function() {
  var pdf;
  beforeEach(function() {
    pdf = probably._betaPDF(10, 23);
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

describe('normPDF', function() {
  var pdf;
  beforeEach(function() {
    pdf = probably.normPDF(5, 1.5);
  });

  it('should return a PDF for the specified normal distribution', function() {
    expect(pdf(0)).toBeCloseTo(0.00102819, 5);
    expect(pdf(1)).toBeCloseTo(0.00759732, 5);
    expect(pdf(2)).toBeCloseTo(0.035994, 5);
    expect(pdf(3)).toBeCloseTo(0.10934, 5);
    expect(pdf(4)).toBeCloseTo(0.212965, 5);
    expect(pdf(5)).toBeCloseTo(0.265962, 5);
    expect(pdf(6)).toBeCloseTo(0.212965, 5);
    expect(pdf(7)).toBeCloseTo(0.10934, 5);
    expect(pdf(8)).toBeCloseTo(0.035994, 5);
    expect(pdf(9)).toBeCloseTo(0.00759732, 5);
    expect(pdf(10)).toBeCloseTo(0.00102819, 5);
  });
});

describe('betaPDF', function() {
  it('should return a Beta PDF for a + b < 1000', function() {
    var pdf = jasmine.createSpy();
    spyOn(probably, '_betaPDF').and.returnValue(pdf);
    expect(probably.betaPDF(10, 23)).toBe(pdf);
    expect(probably._betaPDF.calls.count()).toEqual(1);
    expect(probably._betaPDF).toHaveBeenCalledWith(10, 23);
  });

  it('should return a normal PDF for a + b >= 1000', function() {
    var pdf = jasmine.createSpy();
    spyOn(probably, 'normPDF').and.returnValue(pdf);
    expect(probably.betaPDF(1500, 320)).toBe(pdf);
    expect(probably.normPDF.calls.count()).toEqual(1);
    expect(probably.normPDF).toHaveBeenCalledWith(probably.meanBeta(1500, 320),
                                                  probably.sdBeta(1500, 320));
  });
});

describe('rejectionSample', function() {
  var samples = [];
  beforeEach(function() {
    pdf = probably.normPDF(5, 2);
    for (var i = 0; i < 1000; i++)
      samples.push(probably.rejectionSample(pdf, 0, 10, 0.2));
  });

  it('should sample values from the given distribution', function() {
    expect(probably.mean(samples)).toBeCloseTo(5, 0);
    expect(probably.sd(samples)).toBeCloseTo(2, 0);
  });
});

describe('betaSampler', function() {
  var sampler, sampledValue, pdf;
  beforeEach(function() {
    sampledValue = jasmine.createSpy();
    spyOn(probably, 'rejectionSample').and.returnValue(sampledValue);
    pdf = jasmine.createSpy().and.returnValue(0.5);
    spyOn(probably, 'betaPDF').and.returnValue(pdf);
    sampler = probably.betaSampler(10, 23);
  });

  it('should construct a Beta PDF witih the specified parameters', function() {
    expect(probably.betaPDF.calls.count()).toEqual(1);
    expect(probably.betaPDF).toHaveBeenCalledWith(10, 23);
  });

  it('should return a sampler function', function() {
    expect(sampler instanceof Function).toBe(true);
  });

  it('should pick values using the rejection sampler', function() {
    expect(sampler()).toBe(sampledValue);
    expect(probably.rejectionSample.calls.count()).toEqual(1);
  });

  it('should pick values from the Beta PDF', function() {
    sampler();
    expect(probably.rejectionSample.calls.mostRecent().args[0]).toEqual(pdf);
  });

  it('should pick values from a limited range', function() {
    sampler();
    var args = probably.rejectionSample.calls.mostRecent().args;
    expect(args[1]).toEqual(0);  // xMin
    expect(args[2]).toBeCloseTo(0.9335526836202253);  // xMax
    expect(pdf.calls.mostRecent().args[0]).toBeCloseTo(0.30303030303030304);
    expect(args[3]).toEqual(0.5);  // yMin, specified above
  });
});

describe('improvement', function() {
  var summary;
  beforeEach(function() {
    summary = probably.improvement(10, 23, 8, 34);
  });

  it('should provide an overall probability of improvement', function() {
    expect(summary.prob).toBeCloseTo(0.87251, 1);
  });

  it('should calculate the mean improvement', function() {
    expect(summary.mean).toBeCloseTo(0.7718442655217456, 1);
  });

  it('should calculate the SD of improvement', function() {
    expect(summary.sd).toBeCloseTo(0.8237705640001249, 1);
  });

  it('should draw the specified number of samples', function() {
    spyOn(probably, 'collectn').and.callThrough();
    probably.improvement(10, 23, 8, 24, 20);
    expect(probably.collectn.calls.mostRecent().args[0]).toEqual(20);
  });
});

describe('integrate', function() {
  var f;
  beforeEach(function() {
    f = jasmine.createSpy().and.callFake(function(x) { return (x * x); });
  });

  it('should approximate the specified integral', function() {
    expect(probably.integrate(0, 10, f, 0.0001)).toBeCloseTo(1000 / 3, 1);
    expect(probably.integrate(-10, 10, f, 0.0001)).toBeCloseTo(2000 / 3, 1);
  });

  it('should call the function for each point according to dx', function() {
    probably.integrate(0, 10, f, 1);
    expect(f.calls.count()).toEqual(11);
    for (var i = 0; i <= 10; i++)
      expect(f).toHaveBeenCalledWith(i);
  });

  it('should return 0 if bounds are reversed', function() {
    expect(probably.integrate(1, -1, f, 0.00001)).toEqual(0);
  });
});
