import { Node } from './LinkedList';

export class CircularDoublyLinkedList<T> {
  head: Node<T> | null = null;
  size: number = 0;
  current: Node<T> | null = null; 

  add(value: T): void {
    const newNode = new Node(value);
    
    if (!this.head) {

      this.head = newNode;
      newNode.next = newNode; 
      newNode.prev = newNode;
      this.current = newNode; 
    } else {

      const lastNode = this.head.prev!;
      
      newNode.next = this.head;
      newNode.prev = lastNode;
      
      lastNode.next = newNode;
      this.head.prev = newNode;
    }
    
    this.size++;
  }

  remove(value: T): boolean {
    if (!this.head) return false;
    
    let current = this.head;
    let found = false;

    do {
      if (current.value === value) {
        found = true;
        break;
      }
      current = current.next!;
    } while (current !== this.head);
    
    if (!found) return false;

    if (this.size === 1) {
      this.head = null;
      this.current = null;
    } else {
      const prevNode = current.prev!;
      const nextNode = current.next!;
      
      prevNode.next = nextNode;
      nextNode.prev = prevNode;

      if (current === this.head) {
        this.head = nextNode;
      }

      if (current === this.current) {
        this.current = nextNode;
      }
    }
    
    this.size--;
    return true;
  }

  rotate(): T | null {
    if (!this.current) return null;
    
    this.current = this.current.next;
    return this.current ? this.current.value : null;
  }

  getCurrentValue(): T | null {
    return this.current ? this.current.value : null;
  }

  toArray(): T[] {
    if (!this.head) return [];
    
    const array: T[] = [];
    let current = this.head;
    
    do {
      array.push(current.value);
      current = current.next!;
    } while (current !== this.head);
    
    return array;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }
}
