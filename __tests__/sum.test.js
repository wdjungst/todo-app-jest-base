test('adds 1 + 2 to equal 3', () => {
  const sum = require('../utils/sum');
  expect(sum(1, 2)).toBe(3);
});