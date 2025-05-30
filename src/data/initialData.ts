import { MenuItem, Waiter, RestaurantTable, TableStatus, RestaurantLocation, LocationType } from '../types';
import { v4 as uuidv4 } from 'uuid';


export const initialMenu: MenuItem[] = [

  {
    id: uuidv4(),
    name: 'Garlic Bread',
    category: 'Starters',
    price: 5.99,
    description: 'Freshly baked bread with garlic butter and herbs',
    preparationTime: 8,
    imageUrl: 'https://images.pexels.com/photos/1166120/pexels-photo-1166120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: uuidv4(),
    name: 'Bruschetta',
    category: 'Starters',
    price: 7.99,
    description: 'Toasted bread topped with fresh tomatoes, basil, and olive oil',
    preparationTime: 10,
    imageUrl: 'https://images.pexels.com/photos/2762939/pexels-photo-2762939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: uuidv4(),
    name: 'Mozzarella Sticks',
    category: 'Starters',
    price: 8.99,
    description: 'Breaded and fried mozzarella served with marinara sauce',
    preparationTime: 12,
    imageUrl: 'https://images.pexels.com/photos/15126954/pexels-photo-15126954/free-photo-of-close-up-of-mozzarella-sticks.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },

  {
    id: uuidv4(),
    name: 'Margherita Pizza',
    category: 'Main Courses',
    price: 12.99,
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    preparationTime: 15,
    imageUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: uuidv4(),
    name: 'Spaghetti Carbonara',
    category: 'Main Courses',
    price: 14.99,
    description: 'Spaghetti with creamy sauce, pancetta, eggs, and parmesan',
    preparationTime: 18,
    imageUrl: 'https://images.pexels.com/photos/4518830/pexels-photo-4518830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: uuidv4(),
    name: 'Grilled Salmon',
    category: 'Main Courses',
    price: 19.99,
    description: 'Fresh salmon fillet grilled to perfection with lemon butter sauce',
    preparationTime: 20,
    imageUrl: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: uuidv4(),
    name: 'Beef Burger',
    category: 'Main Courses',
    price: 15.99,
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce',
    preparationTime: 15,
    imageUrl: 'https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },

  {
    id: uuidv4(),
    name: 'Tiramisu',
    category: 'Desserts',
    price: 8.99,
    description: 'Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
    preparationTime: 10,
    imageUrl: 'https://images.pexels.com/photos/6249477/pexels-photo-6249477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: uuidv4(),
    name: 'Chocolate Cake',
    category: 'Desserts',
    price: 7.99,
    description: 'Rich chocolate cake with ganache frosting',
    preparationTime: 8,
    imageUrl: 'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },

  {
    id: uuidv4(),
    name: 'Sparkling Water',
    category: 'Drinks',
    price: 3.99,
    description: 'Refreshing sparkling water with ice and lemon',
    preparationTime: 3,
    imageUrl: 'https://images.pexels.com/photos/2995333/pexels-photo-2995333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: uuidv4(),
    name: 'House Red Wine',
    category: 'Drinks',
    price: 9.99,
    description: 'Glass of our house red wine selection',
    preparationTime: 4,
    imageUrl: 'https://images.pexels.com/photos/1479706/pexels-photo-1479706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const initialWaiters: Waiter[] = [
  {
    id: uuidv4(),
    name: 'Alex Johnson',
    tables: [1, 2, 3],
    currentOrders: []
  },
  {
    id: uuidv4(),
    name: 'Emma Davis',
    tables: [4, 5, 6],
    currentOrders: []
  },
  {
    id: uuidv4(),
    name: 'Michael Smith',
    tables: [7, 8, 9],
    currentOrders: []
  }
];

export const initialTables: RestaurantTable[] = [
  { id: 1, x: 10, y: 10, seats: 2, status: TableStatus.AVAILABLE },
  { id: 2, x: 30, y: 10, seats: 2, status: TableStatus.AVAILABLE },
  { id: 3, x: 50, y: 10, seats: 4, status: TableStatus.AVAILABLE },
  { id: 4, x: 10, y: 30, seats: 4, status: TableStatus.AVAILABLE },
  { id: 5, x: 30, y: 30, seats: 6, status: TableStatus.AVAILABLE },
  { id: 6, x: 50, y: 30, seats: 6, status: TableStatus.AVAILABLE },
  { id: 7, x: 10, y: 50, seats: 8, status: TableStatus.AVAILABLE },
  { id: 8, x: 30, y: 50, seats: 2, status: TableStatus.AVAILABLE },
  { id: 9, x: 50, y: 50, seats: 2, status: TableStatus.AVAILABLE }
];

export const initialLocations: RestaurantLocation[] = [
  { id: 'kitchen', name: 'Kitchen', type: LocationType.KITCHEN, x: 30, y: 5 },
  { id: 'bar', name: 'Bar', type: LocationType.BAR, x: 55, y: 5 },
  { id: 'entrance', name: 'Entrance', type: LocationType.ENTRANCE, x: 30, y: 70 },
  { id: 'restroom1', name: 'Restroom 1', type: LocationType.RESTROOM, x: 5, y: 70 },
  { id: 'restroom2', name: 'Restroom 2', type: LocationType.RESTROOM, x: 55, y: 70 },
  ...initialTables.map(table => ({
    id: `table-${table.id}`,
    name: `Table ${table.id}`,
    type: LocationType.TABLE,
    x: table.x,
    y: table.y
  }))
];
