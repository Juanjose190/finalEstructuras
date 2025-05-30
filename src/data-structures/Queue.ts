/**
 * Queue data structure implementation for order management
 */
export class Queue<T> {
  private items: T[] = [];
  
  // Add an item to the back of the queue
  enqueue(item: T): void {
    this.items.push(item);
  }
  
  // Remove an item from the front of the queue
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }
  
  // View the item at the front of the queue without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }
  
  // Check if the queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  // Get the size of the queue
  size(): number {
    return this.items.length;
  }
  
  // Get all items in the queue (for display purposes)
  getAll(): T[] {
    return [...this.items];
  }
  
  // Clear the queue
  clear(): void {
    this.items = [];
  }
}