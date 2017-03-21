'use strict';

class Heap {
  constructor (payload) {
    this.payload = payload;
    this.length = payload.length;
    this.dirty = false;

    this.getParentIndex = this.getParentIndex.bind(this);
    this.getChildrenIndexes = this.getChildrenIndexes.bind(this);
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

  heapifyUp (value, from = this.length - 1) { // for insert
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

  heapifyDown (value, from = 0) { // for delete after swap
  }

  insert (value) {
    this.payload.push(value);
    this.length = this.payload.length;
    this.dirty = true;

    this.heapifyUp(value);
  }

  delete (value) {
    this.dirty = true;
    //TODO: heapify for deletion, and reset this.length;
    this.length = this.payload.length;
  }

  swap (from, to) {
    [this.payload[from], this.payload[to]] = [this.payload[to], this.payload[from]];
  }

}

module.exports = Heap;
