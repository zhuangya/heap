function defaultCompareFn<T = number>(a: T, b: T): number {
  return Number(b) - Number(a);
}

export class Heap<T = number> {
  private payload: Array<T>;
  compareFn: (a: T, b: T) => number;

  get length() {
    return this.payload.length;
  }

  constructor(payload: Array<T>, compareFn = defaultCompareFn) {
    // TODO: heapify current payload first.
    this.payload = payload;
    this.compareFn = compareFn;
  }

  private swap(since: number, until: number): void {
    [this.payload[since], this.payload[until]] = [
      this.payload[until],
      this.payload[since],
    ];
  }

  private getParentIndex(index: number): number {
    if (index === 0) {
      throw new Error("there is no parent for root node");
    }

    // 从根据当前 index 奇偶决定减 1 还是 2
    // 也就是 Math.floor((index - (index % 2 ? 1 : 2)) / 2)
    // 但其实把分数式拆一下就可以直接 (index / 2) - (index % 2 ? 0 : 1)
    // 再用 `>>>` 直接省掉了 Math.floor

    return (index >>> 1) - (index % 2 ? 0 : 1);
  }

  private getChildrenIndexes(index: number): Array<number> {
    return [index * 2 + 1, index * 2 + 2].filter((x) => x < this.length);
  }

  private getPreferredChildIndex(index: number): number {
    return (
      this.getChildrenIndexes(index).sort((a, b) =>
        this.compareFn(this.payload[a], this.payload[b])
      )[0] ?? -1
    );
  }

  heapifyUp(value: T, since: number = this.length - 1): void {
    if (since === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(since);
    const parentValue = this.payload[parentIndex];

    if (this.compareFn(value, parentValue)) {
      this.swap(since, parentIndex);
      this.heapifyUp(value, parentIndex);
    }
  }

  heapifyDown(since: number = 0): void {
    if (since === this.length) {
      return this.heapifyUp(this.payload[since], since);
    }

    const greaterChildIndex = this.getPreferredChildIndex(since);
    const greaterChildValue = this.payload[greaterChildIndex];

    if (this.compareFn(greaterChildValue, this.payload[since])) {
      this.swap(since, greaterChildIndex);
      this.heapifyDown(greaterChildIndex);
    }
  }

  insert(value: T): void {
    this.payload.push(value);

    this.heapifyUp(value);
  }

  delete(index: number) {
    this.swap(index, this.length - 1);

    this.payload.pop();

    this.heapifyDown(index);
  }
}
