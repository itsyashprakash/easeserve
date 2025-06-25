import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from "./components/sidebar/Sidebar";
import RightSidebar from "./components/right-sidebar/RightSidebar";
import Navbar from './components/navbar/Navbar';
import MenuItems from './components/menu/MenuItems';
import HomePage from './components/home/HomePage';
import InventoryManagement from './components/inventory/InventoryManagement';
import TableManagement from './components/table-management/TableManagement';
import OrdersPage from './components/orders/OrdersPage';
import EmployeeManagement from './components/employee/EmployeeManagement';

function App() {
  const location = useLocation();
  const [items, setItems] = useState([]);

  const handleQuantityChange = (id, change) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddItem = (newItem) => {
    const existingItemIndex = items.findIndex(
      (item) => item.name === newItem.name
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      setItems(updatedItems);
    } else {
      setItems([...items, { ...newItem, id: Date.now(), quantity: 1 }]);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        {location.pathname === '/' ? (
          // Layout for Home page with RightSidebar
          <div className="flex flex-grow">
            <div className="flex flex-col flex-grow">
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={<HomePage onAddItem={handleAddItem} />}
                />
                <Route path="/menu" element={<MenuItems />} />
                <Route path="/inventory" element={<InventoryManagement />} />
                <Route path="/table-management" element={<TableManagement />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/employee" element={<EmployeeManagement />} />
              </Routes>
            </div>
            <RightSidebar
              items={items}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        ) : (
          // Default layout for other pages
          <div className="flex-grow flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage onAddItem={handleAddItem} />} />
              <Route path="/menu" element={<MenuItems />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/table-management" element={<TableManagement />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/employee" element={<EmployeeManagement />} />
            </Routes>
          </div>
        )}
      </div>
    </>
  );
}

export default App;