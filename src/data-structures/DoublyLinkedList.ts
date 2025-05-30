import { Node } from './LinkedList';

export class DoublyLinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  size: number = 0;

  append(value: T): void {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    
    this.size++;
  }

  prepend(value: T): void {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.size++;
  }
  
  remove(value: T): boolean {
    if (!this.head) return false;
    
    let current = this.head;

    while (current && current.value !== value) {
      current = current.next;
    }

    if (!current) return false;

    if (current === this.head) {
      this.head = current.next;
      
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
    } 

    else if (current === this.tail) {
      this.tail = current.prev;
      
      if (this.tail) {
        this.tail.next = null;
      }
    } 
    else {
      if (current.prev) current.prev.next = current.next;
      if (current.next) current.next.prev = current.prev;
    }
    
    this.size--;
    return true;
  }

  toArray(): T[] {
    const array: T[] = [];
    let current = this.head;
    
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    
    return array;
  }

  find(value: T): Node<T> | null {
    let current = this.head;
    
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    
    return null;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}
