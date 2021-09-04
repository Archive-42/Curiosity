// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// Let's Code!
// -----------

// TODO: Implement a Linked List Node class here
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// TODO: Implement a Singly Linked List class here
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // TODO: Implement the addToTail method here
  addToTail(value) {
    const newTail = new Node(value);
    if (!this.head) {
      this.head = newTail;
      this.tail = this.head;
    } else {
      this.tail.next = newTail;
      this.tail = newTail;
    }
    this.length++;
    return this;
  }

  // TODO: Implement the removeTail method here * WILL COME BACK TO
  removeTail() {
    if (!this.head) return undefined;

    let curr = this.head;
    let removed = this.tail;
    let newTail = curr;
    while (curr.next) {
      newTail = curr;
      curr = curr.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return removed;
  }

  // TODO: Implement the addToHead method here
  addToHead(value) {
    const newHead = new Node(value);
    if (!this.head) {
      this.tail = newHead;
      this.head = this.tail;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }
    this.length++;
    return this;
  }

  // TODO: Implement the removeHead method here
  removeHead() {
    if (!this.head) return undefined;
    let currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
      this.head = null;
    }
    return currentHead;
  }

  // TODO: Implement the contains method here
  contains(target) {
    var node = this.head;
    while (node) {
      if (node.value === target) {
        return true;
      }
      node = node.next;
    }
    return false;
  }

  // TODO: Implement the get method here
  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let indexCount = 0;
    let curr = this.head;

    while (indexCount !== index) {
      curr = curr.next;
      indexCount++;
    }
    return curr;
  }

  // TODO: Implement the set method here
  set(index, value) {
    let node = this.get(index);
    if (node) {
      node.value = value;
      return true;
    }
    return false;
  }

  // TODO: Implement the insert method here
  insert(index, value) {
    if (index < 0 || index >= this.length) return false;
    if (index === this.length) return !!this.addToTail(value);
    if (index === 0) return !!this.addToHead(value);

    let newNode = new Node(value);
    let prev = this.get(index - 1);
    let temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;
    this.length++;
    return true;
  }

  // TODO: Implement the remove method here
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === this.length - 1) return this.removeTail();
    if (index === 0) return this.removeTail();
    let prev = this.get(index - 1);
    let node = prev.next;
    prev.next = node.next;
    this.length--;
    return node;
  }

  // TODO: Implement the size method here
  size() {
    let curr = this.head;
    let length = 0;

    while (curr) {
      curr = curr.next;

      length++;
    }

    return length;
  }
}

exports.Node = Node;
exports.LinkedList = LinkedList;
