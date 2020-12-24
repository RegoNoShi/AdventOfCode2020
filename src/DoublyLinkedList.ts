export class Node<T> {
  data: T;
  next?: Node<T>;

  constructor(data: T) {
    this.data = data;
    this.next = undefined;
  }
}

export class LinkedList<T> {
  length: number;
  private head?: Node<T>;
  private tail?: Node<T>;
  private elements: { [index: string]: Node<T> };
  private freeNodes: Node<T>[];

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
    this.elements = {};
    this.freeNodes = [];
  }

  isEmpty() {
    return this.length === 0;
  }

  push(data: T) {
    let node = this.getNode(data);
    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
    this.length++;
    this.elements[`${data}`] = node;
  }

  first(): T | undefined {
    return this.head?.data;
  }

  removeFirst(): T | undefined {
    if (this.head) {
      this.freeNodes.push(this.head);
      let data = this.head.data;
      if (this.tail === this.head) {
        this.head = this.tail = undefined;
      } else {
        this.head = this.head.next;
      }
      this.length--;
      delete this.elements[`${data}`];
      return data;
    }
    return undefined;
  }

  nextAfter(data: T): T | undefined {
    let node = this.elements[`${data}`];
    if (!node) {
      return undefined;
    }

    return node.next?.data;
  }

  insertAfter(data: T, elements: T[]): boolean {
    let node = this.elements[`${data}`];
    if (!node) {
      return false;
    }

    const next = node.next;
    for (const element of elements) {
      let newNode = this.getNode(element);
      node.next = newNode;
      node = newNode;
      this.elements[`${element}`] = newNode;
    }

    if (next) {
      node.next = next;
    } else {
      this.tail = node;
    }

    this.length += elements.length;
    return true;
  }

  private getNode(data: T): Node<T> {
    let node: Node<T>;
    if (this.freeNodes.length > 0) {
      node = this.freeNodes.pop()!;
      node.data = data;
      node.next = undefined;
    } else {
      node = new Node(data);
    }
    return node;
  }
}
