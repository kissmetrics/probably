describe('sum', function() {
  it('should return the sum of a given sequence', function() {
    expect(probably.sum([1, 2, 3, 4])).toEqual(10);
  });

  it('should return 0 for an empty sequence', function() {
    expect(probably.sum([])).toEqual(0)
  });
});
