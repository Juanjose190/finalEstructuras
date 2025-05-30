export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  preparationTime: number; // in minutes
  imageUrl?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  waiterId?: string;
  totalPrice: number;
  specialInstructions?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  status: OrderItemStatus;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  SERVED = 'SERVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum OrderItemStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED',
}

export interface Waiter {
  id: string;
  name: string;
  tables: number[];
  currentOrders: string[]; // Order IDs
}

export interface Change {
  timestamp: Date;
  orderId: string;
  previousStatus: OrderStatus;
  newStatus: OrderStatus;
  description: string;
}

export interface RestaurantTable {
  id: number;
  x: number;
  y: number;
  seats: number;
  status: TableStatus;
  currentOrderId?: string;
}

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  DIRTY = 'DIRTY',
}

export interface RestaurantLocation {
  id: string;
  name: string;
  type: LocationType;
  x: number;
  y: number;
}

export enum LocationType {
  TABLE = 'TABLE',
  KITCHEN = 'KITCHEN',
  BAR = 'BAR',
  ENTRANCE = 'ENTRANCE',
  RESTROOM = 'RESTROOM',
}