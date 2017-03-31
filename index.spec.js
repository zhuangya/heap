"use strict";

const Heap = require("./");

describe("max heap (the default heap)", () => {
  const readOnlyHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);

  test("it should get parent index", () => {
    expect(readOnlyHeap.getParentIndex(1)).toEqual(0);
    expect(readOnlyHeap.getParentIndex(6)).toEqual(2);
  });

  test("it should get children indexes", () => {
    expect(readOnlyHeap.getChildrenIndexes(1)).toEqual([3, 4]);
    expect(readOnlyHeap.getChildrenIndexes(3)).toEqual([7]);
    expect(readOnlyHeap.getChildrenIndexes(6)).toEqual([]);
  });

  test("it should get preferred child index", () => {
    expect(readOnlyHeap.getPreferredChildIndex(0)).toEqual(1);
    expect(readOnlyHeap.getPreferredChildIndex(1)).toEqual(4);
    expect(readOnlyHeap.getPreferredChildIndex(3)).toEqual(7);
    expect(readOnlyHeap.getPreferredChildIndex(6)).toEqual(-1);
  });

  const dirtyHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);
  test("swap should work", () => {
    dirtyHeap.swap(0, 1);
    expect(dirtyHeap.payload).toEqual([99, 100, 98, 60, 65, 32, 33, 3]);
    dirtyHeap.swap(1, 0);
    expect(dirtyHeap.payload).toEqual([100, 99, 98, 60, 65, 32, 33, 3]);
  });

  const insertHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);

  test("should insert to the correct position", () => {
    insertHeap.insert(99);
    expect(insertHeap.payload).toEqual([100, 99, 98, 99, 65, 32, 33, 3, 60]);
    insertHeap.insert(1999);
    expect(insertHeap.payload).toEqual([
      1999,
      100,
      98,
      99,
      99,
      32,
      33,
      3,
      60,
      65
    ]);
  });

  const invalidHeap = new Heap([100, 98, 4, 64, 32, 72, 89]);

  test("should heapifyDown", () => {
    invalidHeap.heapifyDown(2);
    expect(invalidHeap.payload).toEqual([100, 98, 89, 64, 32, 72, 4]);
    invalidHeap.heapifyDown(7);
    expect(invalidHeap.payload).toEqual([100, 98, 89, 64, 32, 72, 4]);
  });

  const tinyHeap = new Heap([2, 1]);
  const largeHeap = new Heap([100, 99, 98, 97, 96, 95, 94]);
  test("should delete", () => {
    tinyHeap.delete(0);
    expect(tinyHeap.payload).toEqual([1]);
    largeHeap.delete(0);
    expect(largeHeap.payload).toEqual([99, 97, 98, 94, 96, 95]);
  });
});
