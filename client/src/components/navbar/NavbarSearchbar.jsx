import React, { useState } from 'react'
import { Search } from 'lucide-react'

const NavbarSearchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
        <div className="flex items-center max-w-xs border rounded-lg overflow-hidden focus-within:border-primary">
          <div className="pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search dishes"
            className="pl-2 pr-4 py-2 w-full focus:outline-none focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
    </>
  )
}

export default NavbarSearchbar