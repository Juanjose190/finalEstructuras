
export class HashTable<T> {
  private table: Array<Array<{ key: string; value: T }>> = [];
  private size: number = 31;
  
  constructor() {
    for (let i = 0; i < this.size; i++) {
      this.table[i] = [];
    }
  }
  
  private hash(key: string): number {
    let hash = 0;
    
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * (i + 1)) % this.size;
    }
    
    return hash;
  }

  set(key: string, value: T): void {
    const index = this.hash(key);

    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i].key === key) {
        this.table[index][i].value = value;
        return;
      }
    }

    this.table[index].push({ key, value });
  }
  
  get(key: string): T | undefined {
    const index = this.hash(key);
    
    for (const entry of this.table[index]) {
      if (entry.key === key) {
        return entry.value;
      }
    }
    
    return undefined;
  }

  remove(key: string): boolean {
    const index = this.hash(key);
    
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i].key === key) {
        this.table[index].splice(i, 1);
        return true;
      }
    }
    
    return false;
  }
  

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }
  
  getAll(): Array<{ key: string; value: T }> {
    const result: Array<{ key: string; value: T }> = [];
    
    for (const bucket of this.table) {
      for (const entry of bucket) {
        result.push(entry);
      }
    }
    
    return result;
  }
}
