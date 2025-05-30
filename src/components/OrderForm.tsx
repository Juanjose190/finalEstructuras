import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MenuItem, OrderItem, OrderItemStatus } from '../types';

const OrderForm: React.FC = () => {
  const { menu, tables, addOrder } = useAppContext();
  
  const [tableNumber, setTableNumber] = useState<number>(1);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  
  // Group menu items by category
  const menuByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);
  
  const handleAddItem = (menuItem: MenuItem) => {
    const existingItem = selectedItems.find(item => item.menuItemId === menuItem.id);
    
    if (existingItem) {
      // Update quantity if item already exists in order
      setSelectedItems(
        selectedItems.map(item =>
          item.menuItemId === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to order
      setSelectedItems([
        ...selectedItems,
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          quantity: 1,
          price: menuItem.price,
          status: OrderItemStatus.PENDING
        }
      ]);
    }
  };
  
  const handleRemoveItem = (menuItemId: string) => {
    const item = selectedItems.find(item => item.menuItemId === menuItemId);
    
    if (item && item.quantity > 1) {
      // Decrease quantity if more than 1
      setSelectedItems(
        selectedItems.map(item =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      // Remove item completely
      setSelectedItems(selectedItems.filter(item => item.menuItemId !== menuItemId));
    }
  };
  
  const calculateTotal = (): number => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItems.length === 0) {
      alert('Please add at least one item to the order');
      return;
    }
    
    // Create new order
    addOrder({
      tableNumber,
      items: selectedItems,
      totalPrice: calculateTotal(),
      specialInstructions
    });
    
    // Reset form
    setSelectedItems([]);
    setSpecialInstructions('');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">New Order</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="tableNumber" className="label">
            Table Number
          </label>
          <select
            id="tableNumber"
            className="input"
            value={tableNumber}
            onChange={(e) => setTableNumber(parseInt(e.target.value))}
          >
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                Table {table.id} ({table.seats} seats)
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Menu</h3>
          
          <div className="mb-4">
            {Object.entries(menuByCategory).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h4 className="text-md font-medium text-primary-600 mb-2">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 border border-gray-200 rounded hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        type="button"
                        className="btn-primary py-1 px-2 text-sm"
                        onClick={() => handleAddItem(item)}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {selectedItems.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Order Summary</h3>
              <div className="border border-gray-200 rounded-md p-3">
                {selectedItems.map((item) => (
                  <div
                    key={item.menuItemId}
                    className="flex justify-between items-center mb-2 last:mb-0"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600 ml-2">x{item.quantity}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        type="button"
                        className="text-error-500 hover:text-error-700"
                        onClick={() => handleRemoveItem(item.menuItemId)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="specialInstructions" className="label">
              Special Instructions
            </label>
            <textarea
              id="specialInstructions"
              className="input h-20"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special instructions for this order..."
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={selectedItems.length === 0}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;