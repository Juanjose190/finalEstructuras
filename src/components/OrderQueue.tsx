import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Order, OrderStatus } from '../types';


interface OrderQueueProps {
  title: string;
  orders: Order[];
  showMoveButton?: boolean;
  onMoveOrder?: (orderId: string) => void;
  emptyMessage?: string;
  dataStructure?: string;
}

const OrderQueue: React.FC<OrderQueueProps> = ({
  title,
  orders,
  showMoveButton = false,
  onMoveOrder,
  emptyMessage = 'No orders',
  dataStructure
}) => {
  const { assignWaiterToOrder } = useAppContext();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {dataStructure && (
          <p className="text-sm text-gray-600 mt-1">
            Using {dataStructure}
          </p>
        )}
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-8">{emptyMessage}</div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`border border-gray-200 rounded-md p-3 transition-all hover:shadow-md
                ${order.status === OrderStatus.READY ? 'animate-pulse bg-success-50' : 'animate-fade-in'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium">Table {order.tableNumber}</span>
                  <span className={`ml-2 badge ${
                    order.status === OrderStatus.READY 
                      ? 'bg-success-100 text-success-800'
                      : order.status === OrderStatus.COMPLETED
                      ? 'bg-primary-100 text-primary-800'
                      : 'badge-secondary'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>
              
              <div className="text-sm mb-2">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''} - $
                {order.totalPrice.toFixed(2)}
              </div>
              
              {order.waiterId ? (
                <div className="text-sm text-secondary-600 mb-2">
                  Assigned to: {order.waiterId}
                </div>
              ) : (
                <button
                  className="text-sm text-accent-500 hover:text-accent-700 mb-2"
                  onClick={() => assignWaiterToOrder(order.id)}
                >
                  Assign waiter
                </button>
              )}
              
              {showMoveButton && onMoveOrder && (
                <button
                  className="w-full btn btn-secondary py-1 text-sm"
                  onClick={() => onMoveOrder(order.id)}
                >
                  Move Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderQueue;
