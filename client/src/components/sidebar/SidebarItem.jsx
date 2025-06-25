import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, to }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex items-center group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink 
        to={to}
        className={({ isActive }) =>
          `p-2 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-primary text-white' : 'group-hover:bg-primary'
          }`
        }
      >
        {({ isActive }) => (
          <Icon className={`transition-colors duration-200 ${isHovered || isActive ? 'text-white' : 'text-muted'}`} />
        )}
      </NavLink>
      {isHovered && (
        <span className="absolute left-16 bg-primary text-white px-2 py-1 rounded shadow-md text-sm whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};

export default SidebarItem;
