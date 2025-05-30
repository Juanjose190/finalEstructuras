import { Node } from './LinkedList';

/**
 * Circular Doubly Linked List implementation for waiter rotation
 */
export class CircularDoublyLinkedList<T> {
  head: Node<T> | null = null;
  size: number = 0;
  current: Node<T> | null = null; // For rotation
  
  // Add a node to the list
  add(value: T): void {
    const newNode = new Node(value);
    
    if (!this.head) {
      // First node in the list
      this.head = newNode;
      newNode.next = newNode; // Points to itself
      newNode.prev = newNode; // Points to itself
      this.current = newNode; // Set current node
    } else {
      // Insert between head and head's previous node
      const lastNode = this.head.prev!;
      
      newNode.next = this.head;
      newNode.prev = lastNode;
      
      lastNode.next = newNode;
      this.head.prev = newNode;
    }
    
    this.size++;
  }
  
  // Remove a node with the given value
  remove(value: T): boolean {
    if (!this.head) return false;
    
    let current = this.head;
    let found = false;
    
    // Loop through the list once
    do {
      if (current.value === value) {
        found = true;
        break;
      }
      current = current.next!;
    } while (current !== this.head);
    
    if (!found) return false;
    
    // If it's the only node
    if (this.size === 1) {
      this.head = null;
      this.current = null;
    } else {
      // Connect the previous and next nodes
      const prevNode = current.prev!;
      const nextNode = current.next!;
      
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      
      // If removing the head, update the head reference
      if (current === this.head) {
        this.head = nextNode;
      }
      
      // If removing the current pointer, update it
      if (current === this.current) {
        this.current = nextNode;
      }
    }
    
    this.size--;
    return true;
  }
  
  // Rotate to the next node and return its value
  rotate(): T | null {
    if (!this.current) return null;
    
    this.current = this.current.next;
    return this.current ? this.current.value : null;
  }
  
  // Get the current node's value
  getCurrentValue(): T | null {
    return this.current ? this.current.value : null;
  }
  
  // Get all values in the list as an array
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
  
  // Check if the list is empty
  isEmpty(): boolean {
    return this.size === 0;
  }
  
  // Get the size of the list
  getSize(): number {
    return this.size;
  }
}