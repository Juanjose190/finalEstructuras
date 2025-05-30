import React from 'react';
import { useAppContext } from '../context/AppContext';
import { OrderStatus } from '../types';

const Kitchen: React.FC = () => {
  const { kitchenOrdersList, moveOrderToServed, updateOrderStatus } = useAppContext();

  const kitchenOrders = kitchenOrdersList.toArray();
  
  const handleMarkAsReady = (orderId: string) => {
    updateOrderStatus(orderId, OrderStatus.READY);
  };
  
  const handleServeOrder = (orderId: string) => {
    moveOrderToServed(orderId);
  };
  
  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Kitchen View</h1>
      
      {kitchenOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-xl text-gray-500">No orders in the kitchen</p>
          <p className="text-gray-400 mt-2">New orders will appear here when they are sent to the kitchen</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-secondary-500 animate-fade-in"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Table {order.tableNumber}</h3>
                  <span className="badge badge-secondary">{order.status}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  Order #{order.id.slice(0, 8)} • {new Date(order.createdAt).toLocaleTimeString()}
                </p>
                
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-gray-200">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                {order.specialInstructions && (
                  <div className="mb-4 p-2 bg-primary-50 border border-primary-100 rounded text-sm">
                    <p className="font-medium text-primary-700">Special Instructions:</p>
                    <p className="text-primary-600">{order.specialInstructions}</p>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  {order.status === OrderStatus.IN_PROGRESS && (
                    <button
                      className="flex-1 btn bg-accent-400 text-gray-900 hover:bg-accent-500"
                      onClick={() => handleMarkAsReady(order.id)}
                    >
                      Mark as Ready
                    </button>
                  )}
                  
                  {order.status === OrderStatus.READY && (
                    <>
                      <span className="flex-1 text-center text-success-600 font-medium">Done</span>
                      <button
                        className="flex-1 btn btn-primary"
                        onClick={() => handleServeOrder(order.id)}
                      >
                        Serve Order
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Kitchen;
