import React from 'react';
import { useAppContext } from '../context/AppContext';
import OrderForm from '../components/OrderForm';
import OrderQueue from '../components/OrderQueue';
import ChangeHistory from '../components/ChangeHistory';
import { OrderStatus } from '../types';

const Dashboard: React.FC = () => {
  const { orders, pendingOrdersQueue, moveOrderToKitchen, changesStack } = useAppContext();
  
  // Get pending orders from the queue
  const pendingOrders = pendingOrdersQueue.getAll();
  
  // Get all other orders from the orders state
  const inProgressOrders = orders.filter(order => order.status === OrderStatus.IN_PROGRESS);
  const readyOrders = orders.filter(order => order.status === OrderStatus.READY);
  const servedOrders = orders.filter(order => order.status === OrderStatus.SERVED);
  const completedOrders = orders.filter(order => order.status === OrderStatus.COMPLETED);
  
  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
      
      <div className="mb-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h2 className="text-lg font-medium text-primary-700 mb-2">Data Structures Overview</h2>
        <ul className="list-disc list-inside text-primary-600 space-y-1">
          <li>New orders enter a Queue data structure</li>
          <li>Kitchen orders use a Linked List for sequential processing</li>
          <li>Served orders are tracked in a Doubly Linked List</li>
          <li>All changes are recorded in a Stack for undo functionality</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <OrderForm />
        </div>
        
        <div>
          <ChangeHistory />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <OrderQueue
            title="Pending Orders"
            orders={pendingOrders}
            showMoveButton={true}
            onMoveOrder={moveOrderToKitchen}
            emptyMessage="No pending orders"
            dataStructure="Queue"
          />
        </div>
        
        <div>
          <OrderQueue
            title="In Kitchen"
            orders={inProgressOrders}
            emptyMessage="No orders in kitchen"
            dataStructure="Linked List"
          />
        </div>
        
        <div>
          <OrderQueue
            title="ready to serve"
            orders={[...readyOrders, ...servedOrders]}
            emptyMessage="No served orders"
            dataStructure="Doubly Linked List"
          />
        </div>
        
        <div>
          <OrderQueue
            title="Completed Orders"
            orders={completedOrders}
            emptyMessage="No completed orders"
            dataStructure="Doubly Linked List"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;