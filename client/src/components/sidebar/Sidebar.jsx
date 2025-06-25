import React from 'react';
import { House, SquareMenu, Box, Users, FileSpreadsheet, Table, ShoppingCart, History } from 'lucide-react';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <aside className="w-16 bg-white h-screen flex flex-col items-center space-y-10 pt-4 border-r border-gray-300">
      <div className="bg-primary text-white mt-1 w-10 h-10 text-center items-center text-3xl rounded-lg">
        <h1><em><strong>e</strong></em></h1>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <SidebarItem icon={House} label="Home" to="/" />
        <SidebarItem icon={Table} label="Table Management" to="/table-management" />
        <SidebarItem icon={SquareMenu} label="Menu" to="/menu" />
        <SidebarItem icon={ShoppingCart} label="Online Orders" to="/online-orders" />
        <SidebarItem icon={History} label="Orders" to="/orders" />
        <SidebarItem icon={Box} label="Inventory" to="/inventory" />
        <SidebarItem icon={Users} label="Employee" to="/employee" />
        <SidebarItem icon={FileSpreadsheet} label="Reports" to="/reports" />
      </div>
    </aside>
  );
};

export default Sidebar;
