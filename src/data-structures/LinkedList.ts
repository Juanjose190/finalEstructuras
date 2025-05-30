/**
 * Node for singly and doubly linked lists
 */
export class Node<T> {
  value: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Singly linked list implementation for kitchen orders
 */
export class LinkedList<T> {
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
      this.head = newNode;
    }
    
    this.size++;
  }
  
  // Remove a node with the given value
  remove(value: T): boolean {
    if (!this.head) return false;
    
    // If the head has the value to remove
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      
      // If the list is now empty, update the tail
      if (this.size === 0) {
        this.tail = null;
      }
      
      return true;
    }
    
    let current = this.head;
    
    // Traverse the list to find the node to remove
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    
    // If the value was found
    if (current.next) {
      // If removing the tail, update the tail reference
      if (current.next === this.tail) {
        this.tail = current;
      }
      
      current.next = current.next.next;
      this.size--;
      return true;
    }
    
    return false;
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