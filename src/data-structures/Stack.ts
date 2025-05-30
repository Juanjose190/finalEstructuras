/**
 * Stack data structure implementation for undo functionality
 */
export class Stack<T> {
  private items: T[] = [];
  
  // Add an item to the top of the stack
  push(item: T): void {
    this.items.push(item);
  }
  
  // Remove an item from the top of the stack
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }
  
  // View the item at the top of the stack without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }
  
  // Check if the stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  // Get the size of the stack
  size(): number {
    return this.items.length;
  }
  
  // Get all items in the stack (for display purposes)
  getAll(): T[] {
    return [...this.items];
  }
  
  // Clear the stack
  clear(): void {
    this.items = [];
  }
}