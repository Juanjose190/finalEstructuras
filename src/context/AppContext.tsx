import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  MenuItem, Order, OrderStatus, OrderItemStatus, 
  Waiter, Change, RestaurantTable, TableStatus, RestaurantLocation
} from '../types';
import { Queue } from '../data-structures/Queue';
import { Stack } from '../data-structures/Stack';
import { LinkedList } from '../data-structures/LinkedList';
import { DoublyLinkedList } from '../data-structures/DoublyLinkedList';
import { CircularDoublyLinkedList } from '../data-structures/CircularDoublyLinkedList';
import { BinaryTree } from '../data-structures/BinaryTree';
import { HashTable } from '../data-structures/HashTable';
import { Graph } from '../data-structures/Graph';
import { initialMenu, initialWaiters, initialTables, initialLocations } from '../data/initialData';


interface AppContextType {

  menu: MenuItem[];
  orders: Order[];
  waiters: Waiter[];
  tables: RestaurantTable[];
  locations: RestaurantLocation[];

  pendingOrdersQueue: Queue<Order>;
  kitchenOrdersList: LinkedList<Order>;
  servedOrdersList: DoublyLinkedList<Order>;
  waitersRotation: CircularDoublyLinkedList<Waiter>;
  changesStack: Stack<Change>;
  menuTree: BinaryTree<MenuItem>;
  menuItemsTable: HashTable<MenuItem>;
  restaurantMap: Graph;

  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  moveOrderToKitchen: (orderId: string) => void;
  moveOrderToServed: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  undoLastChange: () => void;
  assignWaiterToOrder: (orderId: string) => void;
  findShortestPath: (startId: string, endId: string) => { path: string[]; distance: number } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [orders, setOrders] = useState<Order[]>([]);
  const [waiters, setWaiters] = useState<Waiter[]>(initialWaiters);
  const [tables, setTables] = useState<RestaurantTable[]>(initialTables);
  const [locations, setLocations] = useState<RestaurantLocation[]>(initialLocations);
  
  const [pendingOrdersQueue] = useState<Queue<Order>>(new Queue<Order>());
  const [kitchenOrdersList] = useState<LinkedList<Order>>(new LinkedList<Order>());
  const [servedOrdersList] = useState<DoublyLinkedList<Order>>(new DoublyLinkedList<Order>());
  const [waitersRotation] = useState<CircularDoublyLinkedList<Waiter>>(new CircularDoublyLinkedList<Waiter>());
  const [changesStack] = useState<Stack<Change>>(new Stack<Change>());
  const [menuTree] = useState<BinaryTree<MenuItem>>(new BinaryTree<MenuItem>());
  const [menuItemsTable] = useState<HashTable<MenuItem>>(new HashTable<MenuItem>());
  const [restaurantMap] = useState<Graph>(new Graph());
  

  useEffect(() => {

    initialWaiters.forEach(waiter => {
      waitersRotation.add(waiter);
    });

    const compareMenuItems = (a: MenuItem, b: MenuItem): number => {
      return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    };
    
    initialMenu.forEach(item => {
      menuTree.insert(item, compareMenuItems);
      menuItemsTable.set(item.id, item);
    });

    initialLocations.forEach(location => {
      restaurantMap.addVertex(location.id);
    });


const addRestaurantPaths = () => {
  console.log('🏗️ Building restaurant paths...');
  console.log('Available locations:', initialLocations.map(loc => `${loc.id} (${loc.name})`));
  

  const kitchen = initialLocations.find(loc => loc.id === 'kitchen' || loc.name.toLowerCase().includes('kitchen'));
  const entrance = initialLocations.find(loc => loc.id === 'entrance' || loc.name.toLowerCase().includes('entrance'));
  const bar = initialLocations.find(loc => loc.id === 'bar' || loc.name.toLowerCase().includes('bar'));
  const restroom1 = initialLocations.find(loc => loc.id === 'restroom1');
  const restroom2 = initialLocations.find(loc => loc.id === 'restroom2');
  
  const tables = initialLocations.filter(loc => loc.type === "TABLE" || loc.id.includes('table'));
  
  console.log('Found key locations:', {
    kitchen: kitchen?.id,
    entrance: entrance?.id,
    bar: bar?.id,
    restroom1: restroom1?.id,
    restroom2: restroom2?.id,
    tablesCount: tables.length
  });

  if (kitchen && entrance && bar) {
    restaurantMap.addEdge(entrance.id, kitchen.id, calculateDistance(entrance, kitchen));
    restaurantMap.addEdge(entrance.id, bar.id, calculateDistance(entrance, bar));
    restaurantMap.addEdge(kitchen.id, bar.id, calculateDistance(kitchen, bar));
    
    console.log('✅ Connected main areas (entrance, kitchen, bar)');

    if (restroom1) {
      restaurantMap.addEdge(restroom1.id, entrance.id, calculateDistance(restroom1, entrance));
      restaurantMap.addEdge(restroom1.id, bar.id, calculateDistance(restroom1, bar));
      console.log('✅ Connected restroom1');
    }
    
    if (restroom2) {
      restaurantMap.addEdge(restroom2.id, entrance.id, calculateDistance(restroom2, entrance));
      restaurantMap.addEdge(restroom2.id, kitchen.id, calculateDistance(restroom2, kitchen));
      restaurantMap.addEdge(restroom2.id, bar.id, calculateDistance(restroom2, bar));
      console.log('✅ Connected restroom2 to all main areas');
    }

    tables.forEach(table => {
      restaurantMap.addEdge(table.id, entrance.id, calculateDistance(table, entrance));
      restaurantMap.addEdge(table.id, kitchen.id, calculateDistance(table, kitchen));
      restaurantMap.addEdge(table.id, bar.id, calculateDistance(table, bar));
      
      tables.forEach(otherTable => {
        if (table.id !== otherTable.id) {
          const distance = calculateDistance(table, otherTable);
          if (distance < 50) { 
            restaurantMap.addEdge(table.id, otherTable.id, distance);
          }
        }
      });
    });
    
    console.log(`✅ Connected ${tables.length} tables to main areas`);

    const totalEdges = restaurantMap.getAllEdges().length;
    console.log(`🎯 Total connections created: ${totalEdges}`);
    
    if (totalEdges === 0) {
      console.error('🚨 ERROR: No edges were created!');
    }
  
    console.log('🔍 Checking specific connections:');
    console.log('entrance connections:', restaurantMap.getEdges('entrance'));
    console.log('restroom2 connections:', restaurantMap.getEdges('restroom2'));
    
  } else {
    console.error('🚨 ERROR: Could not find main locations', {
      kitchen: !!kitchen,
      entrance: !!entrance, 
      bar: !!bar
    });
  }
};
    
    addRestaurantPaths();
  }, []);

  const calculateDistance = (a: RestaurantLocation, b: RestaurantLocation): number => {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: uuidv4(),
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    pendingOrdersQueue.enqueue(newOrder);

    setOrders(prevOrders => [...prevOrders, newOrder]);
  
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === newOrder.tableNumber 
          ? { ...table, status: TableStatus.OCCUPIED, currentOrderId: newOrder.id } 
          : table
      )
    );
  };
  
  const moveOrderToKitchen = (orderId: string) => {

    const pendingOrders = pendingOrdersQueue.getAll();
    const orderIndex = pendingOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return;

    const tempQueue: Order[] = [];
    let currentOrder: Order | undefined;
    
    for (let i = 0; i < orderIndex; i++) {
      const order = pendingOrdersQueue.dequeue();
      if (order) tempQueue.push(order);
    }
    
    currentOrder = pendingOrdersQueue.dequeue(); 

    tempQueue.forEach(order => pendingOrdersQueue.enqueue(order));
    
    if (!currentOrder) return;

    const updatedOrder: Order = {
      ...currentOrder,
      status: OrderStatus.IN_PROGRESS,
      updatedAt: new Date(),
    };

    kitchenOrdersList.append(updatedOrder);

    changesStack.push({
      timestamp: new Date(),
      orderId: updatedOrder.id,
      previousStatus: OrderStatus.PENDING,
      newStatus: OrderStatus.IN_PROGRESS,
      description: `Order ${updatedOrder.id} moved from pending to kitchen`,
    });

    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? updatedOrder 
          : order
      )
    );
  };
  
  const moveOrderToServed = (orderId: string) => {
    const kitchenOrders = kitchenOrdersList.toArray();
    const order = kitchenOrders.find(order => order.id === orderId);
    
    if (!order) return;

    kitchenOrdersList.remove(order);

    const updatedOrder: Order = {
      ...order,
      status: OrderStatus.SERVED,
      updatedAt: new Date(),
    };

    servedOrdersList.append(updatedOrder);

    changesStack.push({
      timestamp: new Date(),
      orderId: updatedOrder.id,
      previousStatus: OrderStatus.IN_PROGRESS,
      newStatus: OrderStatus.SERVED,
      description: `Order ${updatedOrder.id} moved from kitchen to served`,
    });

    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? updatedOrder 
          : order
      )
    );
  };
  
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => {
        if (order.id === orderId) {
          changesStack.push({
            timestamp: new Date(),
            orderId: order.id,
            previousStatus: order.status,
            newStatus: status,
            description: `Order ${order.id} status changed from ${order.status} to ${status}`,
          });
          
          return {
            ...order,
            status,
            updatedAt: new Date(),
          };
        }
        return order;
      });
      
      return updatedOrders;
    });
  };
  
  const undoLastChange = () => {
    const lastChange = changesStack.pop();
    
    if (!lastChange) return;

    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === lastChange.orderId) {
          return {
            ...order,
            status: lastChange.previousStatus,
            updatedAt: new Date(),
          };
        }
        return order;
      })
    );
  };
  
  const assignWaiterToOrder = (orderId: string) => {
    const nextWaiter = waitersRotation.rotate();
    
    if (!nextWaiter) return;

    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            waiterId: nextWaiter.id,
            updatedAt: new Date(),
          };
        }
        return order;
      })
    );

    setWaiters(prevWaiters => 
      prevWaiters.map(waiter => {
        if (waiter.id === nextWaiter.id) {
          return {
            ...waiter,
            currentOrders: [...waiter.currentOrders, orderId],
          };
        }
        return waiter;
      })
    );
  };
  
  const findShortestPath = (startId: string, endId: string) => {
    return restaurantMap.dijkstra(startId, endId);
  };
  
  const value = {
    menu,
    orders,
    waiters,
    tables,
    locations,
    

    pendingOrdersQueue,
    kitchenOrdersList,
    servedOrdersList,
    waitersRotation,
    changesStack,
    menuTree,
    menuItemsTable,
    restaurantMap,

    addOrder,
    moveOrderToKitchen,
    moveOrderToServed,
    updateOrderStatus,
    undoLastChange,
    assignWaiterToOrder,
    findShortestPath,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;




  
};
