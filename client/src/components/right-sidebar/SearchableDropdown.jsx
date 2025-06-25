import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const SearchableDropdown = ({ options, label, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      e.preventDefault();
      handleOptionClick(filteredOptions[0]);
    }
  };

  return (
    <div className="w-34" ref={dropdownRef}>
      <label htmlFor={`${label}-search`} className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className="relative mt-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          id={`${label}-search`}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-34 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;