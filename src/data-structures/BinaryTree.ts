/**
 * Binary Tree Node for menu categorization
 */
export class BinaryTreeNode<T> {
  value: T;
  left: BinaryTreeNode<T> | null = null;
  right: BinaryTreeNode<T> | null = null;
  
  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Binary Tree implementation for menu navigation
 */
export class BinaryTree<T> {
  root: BinaryTreeNode<T> | null = null;
  
  // Insert a value into the tree
  insert(value: T, compareFn: (a: T, b: T) => number): void {
    const newNode = new BinaryTreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    this.insertNode(this.root, newNode, compareFn);
  }
  
  // Helper method to insert a node recursively
  private insertNode(
    node: BinaryTreeNode<T>,
    newNode: BinaryTreeNode<T>,
    compareFn: (a: T, b: T) => number
  ): void {
    // Compare the values to determine which subtree to insert into
    const comparison = compareFn(newNode.value, node.value);
    
    // If the new value is less than the current node's value
    if (comparison < 0) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode, compareFn);
      }
    } 
    // If the new value is greater than or equal to the current node's value
    else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode, compareFn);
      }
    }
  }
  
  // Search for a value in the tree
  search(value: T, compareFn: (a: T, b: T) => number): BinaryTreeNode<T> | null {
    return this.searchNode(this.root, value, compareFn);
  }
  
  // Helper method to search for a node recursively
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
  
  // In-order traversal of the tree
  inOrderTraversal(callback: (value: T) => void): void {
    this.inOrderTraversalNode(this.root, callback);
  }
  
  // Helper method for in-order traversal
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
  
  // Get all values in the tree as an array (in-order)
  toArray(): T[] {
    const result: T[] = [];
    this.inOrderTraversal((value) => result.push(value));
    return result;
  }
}