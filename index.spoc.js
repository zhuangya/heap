"use strict";

const Heap = require("./");

describe("max heap (the default heap)", () => {
  const readOnlyHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);

  test("it should get parent index", () => {
    [
      readOnlyHeap.getParentIndex(1),
      readOnlyHeap.getParentIndex(6),
    ].forEach((t) => expect(t).toMatchSnapshot());
  });

  test("it should get children indexes", () => {
    [
      readOnlyHeap.getChildrenIndexes(1),
      readOnlyHeap.getChildrenIndexes(3),
      readOnlyHeap.getChildrenIndexes(6),
    ].forEach((t) => expect(t).toMatchSnapshot());
  });

  test("it should get preferred child index", () => {
    [
      readOnlyHeap.getPreferredChildIndex(0),
      readOnlyHeap.getPreferredChildIndex(1),
      readOnlyHeap.getPreferredChildIndex(3),
      readOnlyHeap.getPreferredChildIndex(6),
    ].forEach((t) => expect(t).toMatchSnapshot());
  });

  const dirtyHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);
  test("swap should work", () => {
    dirtyHeap.swap(0, 1);
    expect(dirtyHeap.payload).toMatchSnapshot();
    dirtyHeap.swap(1, 0);
    expect(dirtyHeap.payload).toMatchSnapshot();
  });

  const insertHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);

  test("should insert to the correct position", () => {
    insertHeap.insert(99);
    expect(insertHeap.payload).toMatchSnapshot();
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
      65,
    ]);
  });

  const invalidHeap = new Heap([100, 98, 4, 64, 32, 72, 89]);

  test("should heapifyDown", () => {
    invalidHeap.heapifyDown(2);
    expect(invalidHeap.payload).toMatchSnapshot();
    invalidHeap.heapifyDown(7);
    expect(invalidHeap.payload).toMatchSnapshot();
  });

  const tinyHeap = new Heap([2, 1]);
  const largeHeap = new Heap([100, 99, 98, 97, 96, 95, 94]);
  test("should delete", () => {
    tinyHeap.delete(0);
    expect(tinyHeap.payload).toMatchSnapshot();
    largeHeap.delete(0);
    expect(largeHeap.payload).toMatchSnapshot();
  });
});
