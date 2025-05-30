import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MenuItem } from '../types';

const MenuExplorer: React.FC = () => {
  const { menuTree, menuItemsTable } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  // Get all menu items from the binary tree
  const allMenuItems = menuTree.toArray();
  
  // Extract unique categories
  const categories = [...new Set(allMenuItems.map(item => item.category))];
  
  // Filter menu items based on category and search term
  const filteredItems = allMenuItems.filter(item => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  
  const handleItemClick = (item: MenuItem) => {
    // Get the item from the hash table to simulate hash table lookup
    const itemFromHash = menuItemsTable.get(item.id);
    if (itemFromHash) {
      setSelectedItem(itemFromHash);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Menu Explorer</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={handleSearch}
          className="input"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleItemClick(item)}
          >
            {item.imageUrl && (
              <div className="h-40 mb-3 overflow-hidden rounded-md">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="text-primary-500 font-medium">${item.price.toFixed(2)}</p>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>
      
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">{selectedItem.name}</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>
            </div>
            
            {selectedItem.imageUrl && (
              <div className="h-56 mb-4 overflow-hidden rounded-md">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="mb-4">
              <span className="badge badge-secondary mb-2">{selectedItem.category}</span>
              <p className="text-primary-500 font-medium text-xl mb-2">
                ${selectedItem.price.toFixed(2)}
              </p>
              <p className="text-gray-700">{selectedItem.description}</p>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Preparation time: {selectedItem.preparationTime} minutes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuExplorer;