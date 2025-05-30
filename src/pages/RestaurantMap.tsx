import React from 'react';
import RestaurantMapView from '../components/RestaurantMapView';

const RestaurantMap: React.FC = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Restaurant Map</h1>
      
      <RestaurantMapView />
    </div>
  );
};

export default RestaurantMap;