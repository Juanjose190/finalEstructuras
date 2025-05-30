import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChefHat, ClipboardList, Home, MapPin, MenuSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-primary-500 text-white">
        <div className="p-4 flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-xl font-bold hidden md:block">Restaurant OS</h1>
            <div className="md:hidden flex justify-center">
              <ChefHat size={28} />
            </div>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              <NavItem to="/" icon={<Home />} label="Dashboard" />
              <NavItem to="/orders" icon={<ClipboardList />} label="Orders" />
              <NavItem to="/kitchen" icon={<ChefHat />} label="Kitchen" />
              <NavItem to="/menu" icon={<MenuSquare />} label="Menu" />
              <NavItem to="/map" icon={<MapPin />} label="Restaurant Map" />
            </ul>
          </nav>

          <div className="mt-auto text-xs text-primary-200 hidden md:block">
            <p>© 2025 Restaurant OS</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-md transition-colors ${
            isActive ? 'bg-primary-600 text-white' : 'text-primary-100 hover:bg-primary-400'
          }`
        }
      >
        <span className="mr-3">{icon}</span>
        <span className="hidden md:inline">{label}</span>
      </NavLink>
    </li>
  );
};

export default Layout;