import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Order, OrderStatus } from '../types';

const Orders: React.FC = () => {
  const { orders, updateOrderStatus } = useAppContext();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');

  const filteredOrders = statusFilter === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);
  
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);

    if (newStatus === OrderStatus.SERVED) {
      setTimeout(() => {
        updateOrderStatus(orderId, OrderStatus.COMPLETED);
      }, 2000);
    }
  };
  
  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case OrderStatus.PENDING:
        return (
          <select
            className="input text-sm py-1"
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
          >
            <option value={OrderStatus.PENDING}>Pending</option>
            <option value={OrderStatus.IN_PROGRESS}>In Progress</option>
            <option value={OrderStatus.CANCELLED}>Cancelled</option>
          </select>
        );
      
      case OrderStatus.IN_PROGRESS:
        return (
          <select
            className="input text-sm py-1"
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
          >
            <option value={OrderStatus.IN_PROGRESS}>In Progress</option>
            <option value={OrderStatus.READY}>Ready</option>
            <option value={OrderStatus.CANCELLED}>Cancelled</option>
          </select>
        );
      
      case OrderStatus.READY:
        return (
          <select
            className="input text-sm py-1"
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
          >
            <option value={OrderStatus.READY}>Ready</option>
            <option value={OrderStatus.SERVED}>Served</option>
            <option value={OrderStatus.CANCELLED}>Cancelled</option>
          </select>
        );
      
      case OrderStatus.SERVED:
        return (
          <select
            className="input text-sm py-1"
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
          >
            <option value={OrderStatus.SERVED}>Served</option>
            <option value={OrderStatus.COMPLETED}>Completed</option>
          </select>
        );
      
      default:
        return (
          <span className={`badge ${
            order.status === OrderStatus.COMPLETED 
              ? 'bg-success-100 text-success-800' 
              : 'bg-error-100 text-error-800'
          }`}>
            {order.status}
          </span>
        );
    }
  };
  
  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
      
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h2 className="text-lg font-medium text-primary-700 mb-2">Data Structures Legend</h2>
        <ul className="list-disc list-inside text-primary-600 space-y-1">
          <li>Queue: Manages new incoming orders</li>
          <li>Linked List: Handles orders in kitchen</li>
          <li>Doubly Linked List: Tracks served and completed orders</li>
          <li>Stack: Records all status changes for undo functionality</li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold mb-3 md:mb-0">All Orders</h2>
          
          <div className="flex space-x-3">
            <div>
              <label htmlFor="statusFilter" className="label">Filter by Status</label>
              <select
                id="statusFilter"
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
              >
                <option value="ALL">All Orders</option>
                {Object.values(OrderStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {sortedOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No orders found{statusFilter !== 'ALL' ? ` with status ${statusFilter}` : ''}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waiter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Table {order.tableNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.waiterId || 'Not assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getStatusActions(order)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};



export default Orders
