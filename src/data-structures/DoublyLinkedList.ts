import { Node } from './LinkedList';

/**
 * Doubly linked list implementation for served orders
 */
export class DoublyLinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  size: number = 0;
  
  // Add an item to the end of the list
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
  
  // Add an item to the beginning of the list
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
  
  // Remove a node with the given value
  remove(value: T): boolean {
    if (!this.head) return false;
    
    let current = this.head;
    
    // Traverse the list to find the node to remove
    while (current && current.value !== value) {
      current = current.next;
    }
    
    // If the value was not found
    if (!current) return false;
    
    // If removing the head
    if (current === this.head) {
      this.head = current.next;
      
      if (this.head) {
        this.head.prev = null;
      } else {
        // If the list is now empty, update the tail
        this.tail = null;
      }
    } 
    // If removing the tail
    else if (current === this.tail) {
      this.tail = current.prev;
      
      if (this.tail) {
        this.tail.next = null;
      }
    } 
    // If removing a node in the middle
    else {
      if (current.prev) current.prev.next = current.next;
      if (current.next) current.next.prev = current.prev;
    }
    
    this.size--;
    return true;
  }
  
  // Get all values in the list as an array
  toArray(): T[] {
    const array: T[] = [];
    let current = this.head;
    
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    
    return array;
  }
  
  // Find a node with the given value
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
  
  // Clear the list
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}