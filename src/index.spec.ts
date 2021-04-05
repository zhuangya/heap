import { Heap } from ".";

describe("max heap (the default heap)", () => {
  const maxHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);
  /***
   * maxHeap:
   *             100
   *           /     \
   *          99     98
   *         /  \   /  \
   *        60  65 32  33
   *       /
   *      3
   */

  test.each([
    [1, 0],
    [2, 0],
    [3, 1],
    [4, 1],
    [5, 2],
    [6, 2],
    [7, 3],
    [8, 3],
    [9, 4],
    [10, 4],
  ])("index at %i's parent index should be %i", (input, result) => {
    expect(maxHeap.getParentIndex(input)).toBe(result);
  });

  test("try to get root node's parent should throw", () => {
    expect(() => maxHeap.getParentIndex(0)).toThrow(
      "there is no parent for root node"
    );
  });

  test.each([
    [0, [1, 2]],
    [1, [3, 4]],
    [2, [5, 6]],
    [3, [7]],
    [4, []],
    [5, []],
    [6, []],
    [7, []],
  ])("parent index %i should have children %j", (input, result) => {
    expect(maxHeap.getChildrenIndexes(input)).toStrictEqual(result);
  });

  test.each([
    [0, 1],
    [1, 4],
    [2, 6],
    [3, 7],
    [4, -1],
    [5, -1],
    [6, -1],
    [7, -1],
  ])("parent index %i's preferred child index is %i", (input, result) => {
    expect(maxHeap.getPreferredChildIndex(input)).toBe(result);
  });
});

describe("min heap (the default heap)", () => {
  const minHeap = new Heap([1, 2, 3, 7, 5, 4, 9, 30, 42], (a, b) => a - b);
  /***
   * minHeap:
   *         1
   *       /   \
   *      2     3
   *     / \   / \
   *    7  5  4   9
   *   / \
   *  30  42
   */

  test.each([
    [1, 0],
    [2, 0],
    [3, 1],
    [4, 1],
    [5, 2],
    [6, 2],
    [7, 3],
    [8, 3],
    [9, 4],
  ])("index at %i's parent index should be %i", (input, result) => {
    expect(minHeap.getParentIndex(input)).toBe(result);
  });

  test("try to get root node's parent should throw", () => {
    expect(() => minHeap.getParentIndex(0)).toThrow(
      "there is no parent for root node"
    );
  });

  test.each([
    [0, [1, 2]],
    [1, [3, 4]],
    [2, [5, 6]],
    [3, [7, 8]],
    [4, []],
    [5, []],
    [6, []],
    [7, []],
  ])("parent index %i should have children %j", (input, result) => {
    expect(minHeap.getChildrenIndexes(input)).toStrictEqual(result);
  });

  test.each([
    [0, 1],
    [1, 4],
    [2, 5],
    [3, 7],
    [4, -1],
    [5, -1],
    [6, -1],
    [7, -1],
  ])("parent index %i's preferred child index is %i", (input, result) => {
    expect(minHeap.getPreferredChildIndex(input)).toBe(result);
  });
});
