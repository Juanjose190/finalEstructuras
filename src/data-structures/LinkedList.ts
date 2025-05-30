
export class Node<T> {
  value: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}


export class LinkedList<T> {
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
      this.head = newNode;
    }
    
    this.size++;
  }

  remove(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;

      if (this.size === 0) {
        this.tail = null;
      }
      
      return true;
    }
    
    let current = this.head;

    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {

      if (current.next === this.tail) {
        this.tail = current;
      }
      
      current.next = current.next.next;
      this.size--;
      return true;
    }
    
    return false;
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
