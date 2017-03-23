'use strict';

class Heap {
  constructor (payload) {
    this.payload = payload;
    this.length = payload.length;
    this.dirty = false;

    this.getParentIndex = this.getParentIndex.bind(this);
    this.getChildrenIndexes = this.getChildrenIndexes.bind(this);
    this.getGreaterChildIndex = this.getGreaterChildIndex.bind(this);
    this.heapifyUp = this.heapifyUp.bind(this);
    this.heapifyDown = this.heapifyDown.bind(this);
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
    this.swap = this.swap.bind(this);
  }

  getParentIndex (index) {
    return index ? Math.floor((index - 1) / 2) : index;
  }

  getChildrenIndexes (index) {
    return [index * 2 + 1, index * 2 + 2].filter(x => x < this.length);
  }

  getGreaterChildIndex (index) {
    const children = this.getChildrenIndexes(index);
    return children.reduce((maxIndex, i) => {
      if (maxIndex === -1) {
        return typeof i === 'undefined' ? -1 : i;
      }

      return this.payload[i] > this.payload[maxIndex] ? i : maxIndex;
    }, -1);
  }

  heapifyUp (value, from = this.length - 1) {
    if (from === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(from);
    const parentValue = this.payload[parentIndex];

    if (parentValue < value) {
      this.swap(from, parentIndex);
      this.heapifyUp(value, parentIndex);
    }
  }

  heapifyDown (from = 0) {
    if (from === this.length) {
      return this.heapifyUp(this.payload[from], from);
    }

    const greaterChildIndex = this.getGreaterChildIndex(from);
    const greaterChildValue = this.payload[greaterChildIndex];

    if (this.payload[from] < greaterChildValue) {
      this.swap(from, greaterChildIndex);
      this.heapifyDown(greaterChildIndex);
    }
  }

  insert (value) {
    this.payload.push(value);
    this.length = this.payload.length;
    this.dirty = true;

    this.heapifyUp(value);
  }

  delete (index) {
    this.dirty = true;
    this.swap(index, this.length - 1);

    this.payload.pop();
    this.length = this.payload.length;

    this.heapifyDown(index);
  }

  swap (from, to) {
    [this.payload[from], this.payload[to]] = [this.payload[to], this.payload[from]];
  }

}

module.exports = Heap;
