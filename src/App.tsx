import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Kitchen from './pages/Kitchen';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import RestaurantMap from './pages/RestaurantMap';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/map" element={<RestaurantMap />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}

export default App;