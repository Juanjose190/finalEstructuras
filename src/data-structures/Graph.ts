/**
 * Graph implementation for restaurant map
 */
export class Graph {
  private adjacencyList: Map<string, Map<string, number>> = new Map();
  
  // Add a vertex to the graph
  addVertex(vertex: string): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Map());
    }
  }
  
  // Add an edge between two vertices with a weight (distance in meters)
  addEdge(vertex1: string, vertex2: string, weight: number): void {
    // Ensure both vertices exist
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    
    // Add edges in both directions (undirected graph)
    this.adjacencyList.get(vertex1)?.set(vertex2, weight);
    this.adjacencyList.get(vertex2)?.set(vertex1, weight);
    
    // Debug logging
    console.log(`🔗 Added edge: ${vertex1} ↔ ${vertex2} (${weight.toFixed(1)}m)`);
  }
  
  // Remove an edge between two vertices
  removeEdge(vertex1: string, vertex2: string): void {
    this.adjacencyList.get(vertex1)?.delete(vertex2);
    this.adjacencyList.get(vertex2)?.delete(vertex1);
  }
  
  // Remove a vertex and all its edges
  removeVertex(vertex: string): void {
    if (!this.adjacencyList.has(vertex)) return;
    
    // Remove all edges to this vertex
    for (const adjacentVertex of this.adjacencyList.get(vertex)?.keys() || []) {
      this.adjacencyList.get(adjacentVertex)?.delete(vertex);
    }
    
    // Remove the vertex itself
    this.adjacencyList.delete(vertex);
  }
  
  // Get all vertices
  getVertices(): string[] {
    return Array.from(this.adjacencyList.keys());
  }
  
  // Get all edges for a vertex
  getEdges(vertex: string): Map<string, number> | undefined {
    return this.adjacencyList.get(vertex);
  }
  
  // Get all edges in the graph as an array of [vertex1, vertex2, weight] tuples
  getAllEdges(): [string, string, number][] {
    const edges: [string, string, number][] = [];
    
    for (const [vertex, neighbors] of this.adjacencyList.entries()) {
      for (const [neighbor, weight] of neighbors.entries()) {
        // To avoid duplicates (since it's an undirected graph),
        // only add each edge once based on vertex name ordering
        if (vertex < neighbor) {
          edges.push([vertex, neighbor, weight]);
        }
      }
    }
    
    return edges;
  }
  
  // Debug method to log graph structure
  debugGraph(): void {
    console.log('🔍 Graph Debug Info:');
    console.log('Vertices:', this.getVertices());
    
    for (const [vertex, neighbors] of this.adjacencyList.entries()) {
      const neighborsList = Array.from(neighbors.entries())
        .map(([neighbor, weight]) => `${neighbor}(${weight.toFixed(1)}m)`)
        .join(', ');
      console.log(`  ${vertex} → [${neighborsList}]`);
    }
  }
  
  // Implementation of Dijkstra's algorithm for finding shortest paths
  dijkstra(start: string, end: string): { path: string[]; distance: number } | null {
    console.log(`🎯 Finding path from ${start} to ${end}`);
    
    if (!this.adjacencyList.has(start) || !this.adjacencyList.has(end)) {
      console.log(`❌ Start or end vertex not found in graph`);
      console.log(`Start (${start}) exists:`, this.adjacencyList.has(start));
      console.log(`End (${end}) exists:`, this.adjacencyList.has(end));
      return null;
    }
    
    const distances: Map<string, number> = new Map();
    const previous: Map<string, string | null> = new Map();
    const visited: Set<string> = new Set();
    const vertices = Array.from(this.adjacencyList.keys());
    
    // Initialize distances
    for (const vertex of vertices) {
      distances.set(vertex, vertex === start ? 0 : Infinity);
      previous.set(vertex, null);
    }
    
    console.log(`📊 Initial distances:`, Object.fromEntries(distances));
    

    console.log('🔍 Debug state:');
console.log('vertices array:', vertices);
console.log('vertices.length:', vertices.length);
console.log('visited.size:', visited.size);
console.log('start vertex distance:', distances.get(start));
    // Main algorithm loop
    while (visited.size < vertices.length) {
      // Find unvisited vertex with minimum distance
   // Find unvisited vertex with minimum distance
let current: string | null = null;
let minDistance = Infinity;

console.log('🔍 Looking for minimum distance vertex:');
for (const vertex of vertices) {
  const distance = distances.get(vertex) ?? Infinity;
  const isVisited = visited.has(vertex);
  console.log(`  ${vertex}: distance=${distance}, visited=${isVisited}`);
  
  if (!visited.has(vertex) && distance < minDistance) {
    minDistance = distance;
    current = vertex;
    console.log(`    👆 New minimum: ${vertex} (${distance})`);
  }
}

console.log(`🎯 Selected vertex: ${current} with distance: ${minDistance}`);
      
      // If no reachable vertex found
      if (!current || minDistance === Infinity) {
        console.log(`❌ No reachable unvisited vertices found`);
        break;
      }
      
      // If we reached the destination
      if (current === end) {
        console.log(`🎉 Reached destination: ${end}`);
        break;
      }
      
      visited.add(current);
      console.log(`🔄 Visiting: ${current} (distance: ${minDistance})`);
      
      // Update distances to neighbors
      const neighbors = this.adjacencyList.get(current);
      if (!neighbors) {
        console.log(`⚠️ No neighbors found for ${current}`);
        continue;
      }
      
      for (const [neighbor, weight] of neighbors.entries()) {
        if (visited.has(neighbor)) continue;
        
        const currentDistance = distances.get(current) || 0;
        const newDistance = currentDistance + weight;
        const neighborDistance = distances.get(neighbor) || Infinity;
        
        if (newDistance < neighborDistance) {
          distances.set(neighbor, newDistance);
          previous.set(neighbor, current);
          console.log(`📈 Updated ${neighbor}: ${neighborDistance} → ${newDistance} (via ${current})`);
        }
      }
    }
    
    // Reconstruct path
 // Reconstruct path
const path: string[] = [];
let current: string | null = end;  // ✅ Esto está bien

while (current) {
  path.unshift(current);  // ✅ Esto también está bien
  current = previous.get(current) || null;
}

// ❌ AQUÍ ESTÁ EL PROBLEMA
if (path.length === 0 || path[0] !== start) {
  console.log(`❌ No valid path found. Reconstructed path:`, path);
  console.log(`❌ Path starts with:`, path[0], `(should be ${start})`);
  return null;
}
    
    const finalDistance = distances.get(end) || Infinity;
    console.log(`✅ Path found:`, path.join(' → '));
    console.log(`✅ Total distance:`, finalDistance);
    
    return {
      path,
      distance: finalDistance,
    };
  }
}