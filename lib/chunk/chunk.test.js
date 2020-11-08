const assert = require('assert');
const { chunk } = require('./chunk');

describe('chunk', () => {
  it('should require an array as the first argument', () => {
    let errorCaught = false;
    try {
      chunk({});
    } catch (error) {
      errorCaught = true;
      assert.strictEqual(error.message, 'Invalid first argument, should be array');
    }
    assert.strictEqual(errorCaught, true);
  });
  it('should chunk with a default of chunk size 1', () => {
    const arrayToChunk = [1, 2, 3, 4, 5, 6];
    const chunkedArray = chunk(arrayToChunk);
    const expectedResult = [[1], [2], [3], [4], [5], [6]];
    assert.notStrictEqual(chunkedArray, expectedResult);
  });
  it('should chunk with a given size', () => {
    const arrayToChunk = [1, 2, 3, 4, 5, 6];
    const chunkedArray = chunk(arrayToChunk, 3);
    const expectedResult = [[1, 2, 3], [4, 5, 6]];
    assert.notStrictEqual(chunkedArray, expectedResult);
  });
  it('should have leftovers if size/array.length not even', () => {
    const arrayToChunk = [1, 2, 3, 4, 5, 6];
    const chunkedArray = chunk(arrayToChunk, 4);
    const expectedResult = [[1, 2, 3, 4], [5, 6]];
    assert.notStrictEqual(chunkedArray, expectedResult);
  });
});
