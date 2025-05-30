import React from 'react';
import MenuExplorer from '../components/MenuExplorer';

const Menu: React.FC = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Menu Management</h1>
      
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h2 className="text-lg font-medium text-primary-700 mb-2">Data Structures Overview</h2>
        <ul className="list-disc list-inside text-primary-600 space-y-1">
          <li>Binary Tree: Used for efficient menu categorization and navigation</li>
          <li>Hash Table: Provides O(1) access to menu items by ID</li>
          <li>Both structures work together to optimize menu operations</li>
        </ul>
      </div>
      
      <MenuExplorer />
    </div>
  );
};

export default Menu;