
export class BinaryTreeNode<T> {
  value: T;
  left: BinaryTreeNode<T> | null = null;
  right: BinaryTreeNode<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

export class BinaryTree<T> {
  root: BinaryTreeNode<T> | null = null;

  insert(value: T, compareFn: (a: T, b: T) => number): void {
    const newNode = new BinaryTreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    this.insertNode(this.root, newNode, compareFn);
  }

  private insertNode(
    node: BinaryTreeNode<T>,
    newNode: BinaryTreeNode<T>,
    compareFn: (a: T, b: T) => number
  ): void {
    const comparison = compareFn(newNode.value, node.value);

    if (comparison < 0) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode, compareFn);
      }
    } 

    else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode, compareFn);
      }
    }
  }

  search(value: T, compareFn: (a: T, b: T) => number): BinaryTreeNode<T> | null {
    return this.searchNode(this.root, value, compareFn);
  }

  private searchNode(
    node: BinaryTreeNode<T> | null,
    value: T,
    compareFn: (a: T, b: T) => number
  ): BinaryTreeNode<T> | null {
    if (node === null) {
      return null;
    }
    
    const comparison = compareFn(value, node.value);
    
    if (comparison === 0) {
      return node;
    }
    
    if (comparison < 0) {
      return this.searchNode(node.left, value, compareFn);
    }
    
    return this.searchNode(node.right, value, compareFn);
  }

  inOrderTraversal(callback: (value: T) => void): void {
    this.inOrderTraversalNode(this.root, callback);
  }

  private inOrderTraversalNode(
    node: BinaryTreeNode<T> | null,
    callback: (value: T) => void
  ): void {
    if (node !== null) {
      this.inOrderTraversalNode(node.left, callback);
      callback(node.value);
      this.inOrderTraversalNode(node.right, callback);
    }
  }

  toArray(): T[] {
    const result: T[] = [];
    this.inOrderTraversal((value) => result.push(value));
    return result;
  }
}
