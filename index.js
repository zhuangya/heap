"use strict";

const defaultCompareFn = (a, b) => Boolean(a > b);

class Heap {
  constructor(payload, compareFn = defaultCompareFn) {
    this.payload = payload;
    this.length = payload.length;

    this.compareFn = compareFn;

    this.getParentIndex = this.getParentIndex.bind(this);
    this.getChildrenIndexes = this.getChildrenIndexes.bind(this);
    this.getPreferredChildIndex = this.getPreferredChildIndex.bind(this);
    this.heapifyUp = this.heapifyUp.bind(this);
    this.heapifyDown = this.heapifyDown.bind(this);
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
    this.swap = this.swap.bind(this);
  }

  getParentIndex(index) {
    return index ? Math.floor((index - 1) / 2) : index;
  }

  getChildrenIndexes(index) {
    return [index * 2 + 1, index * 2 + 2].filter(x => x < this.length);
  }

  getPreferredChildIndex(index) {
    const children = this.getChildrenIndexes(index);
    return children.reduce(
      (maxIndex, i) => {
        if (maxIndex === -1) {
          return typeof i === "undefined" ? -1 : i;
        }

        return this.compareFn(this.payload[i], this.payload[maxIndex])
          ? i
          : maxIndex;
      },
      -1
    );
  }

  heapifyUp(value, from = this.length - 1) {
    if (from === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(from);
    const parentValue = this.payload[parentIndex];

    if (this.compareFn(value, parentValue)) {
      this.swap(from, parentIndex);
      this.heapifyUp(value, parentIndex);
    }
  }

  heapifyDown(from = 0) {
    if (from === this.length) {
      return this.heapifyUp(this.payload[from], from);
    }

    const greaterChildIndex = this.getPreferredChildIndex(from);
    const greaterChildValue = this.payload[greaterChildIndex];

    if (this.compareFn(greaterChildValue, this.payload[from])) {
      this.swap(from, greaterChildIndex);
      this.heapifyDown(greaterChildIndex);
    }
  }

  insert(value) {
    this.payload.push(value);
    this.length = this.payload.length;

    this.heapifyUp(value);
  }

  delete(index) {
    this.swap(index, this.length - 1);

    this.payload.pop();
    this.length = this.payload.length;

    this.heapifyDown(index);
  }

  swap(from, to) {
    [this.payload[from], this.payload[to]] = [
      this.payload[to],
      this.payload[from]
    ];
  }
}

module.exports = Heap;
