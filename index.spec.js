'use strict';

const Heap = require('./');

const readOnlyHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);

test('it should get parent index', () => {
  expect(readOnlyHeap.getParentIndex(1)).toEqual(0);
  expect(readOnlyHeap.getParentIndex(6)).toEqual(2);
});

test('it should get children indexes', () => {
  expect(readOnlyHeap.getChildrenIndexes(1)).toEqual([3, 4]);
  expect(readOnlyHeap.getChildrenIndexes(3)).toEqual([7]);
  expect(readOnlyHeap.getChildrenIndexes(6)).toEqual([]);
});

const dirtyHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);
test('swap should work', () => {
  dirtyHeap.swap(0, 1);
  expect(dirtyHeap.payload).toEqual([99, 100, 98, 60, 65, 32, 33, 3]);
  dirtyHeap.swap(1, 0);
  expect(dirtyHeap.payload).toEqual([100, 99, 98, 60, 65, 32, 33, 3]);
});

const insertHeap = new Heap([100, 99, 98, 60, 65, 32, 33, 3]);

test('should insert to the correct position', () => {
  insertHeap.insert(99);
  expect(insertHeap.payload).toEqual([100, 99, 98, 99, 65, 32, 33, 3, 60]);
  insertHeap.insert(1999);
  expect(insertHeap.payload).toEqual([1999, 100, 98, 99, 99, 32, 33, 3, 60, 65]);
});

