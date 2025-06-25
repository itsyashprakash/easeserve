import React, { useState } from "react";
import { 
  X, 
  PlusCircle, 
  Upload, 
  FileDown, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

// modal start here
const ModalTrigger = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-400 transition-colors flex items-center shadow-md"
      >
        <PlusCircle className="mr-2" size={20} />
        Create Menu Item
      </button>
    );
  };
  
  const InputField = ({ label, id, type, value, onChange, required }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
    </div>
  );
  
  const MenuModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      quantity: '',
      price: '',
      image: null,
      category: '',
    });
  
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'file' ? (files?.[0] || null) : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.quantity || !formData.price || !formData.category) {
        // TODO: Replace with proper form validation UI
        alert('Please fill in all required fields');
        return;
      }
      // Here you would handle the form submission
      // For example, send the data to an API
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed -inset-full bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
        <div 
          className={`bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">Create Menu Item</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-4 transition-all duration-300 ease-in-out">
              <InputField
                label="Name"
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Quantity"
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <InputField
                label="Price"
                id="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input id="image" name="image" type="file" className="sr-only" onChange={handleChange} required />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="main-course">Main Course</option>
                  <option value="dessert">Dessert</option>
                  <option value="beverage">Beverage</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // modal ends here

function MenuItems() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([
    { id: 1, name: "Pizza", quantity: 10, price: "$12.99", image: "pizza.png", category: "Fast Food" },
    { id: 2, name: "Burger", quantity: 15, price: "$8.99", image: "burger.png", category: "Fast Food" },
    { id: 3, name: "Sushi", quantity: 5, price: "$22.99", image: "sushi.png", category: "Japanese" },
    { id: 4, name: "Pasta", quantity: 8, price: "$14.99", image: "pasta.png", category: "Italian" },
    { id: 5, name: "Salad", quantity: 12, price: "$9.99", image: "salad.png", category: "Healthy" },
    { id: 6, name: "Steak", quantity: 7, price: "$24.99", image: "steak.png", category: "Main Course" },
    { id: 7, name: "Fish and Chips", quantity: 9, price: "$16.99", image: "fish-chips.png", category: "British" },
    { id: 8, name: "Tacos", quantity: 20, price: "$10.99", image: "tacos.png", category: "Mexican" },
    { id: 9, name: "Ice Cream", quantity: 25, price: "$5.99", image: "ice-cream.png", category: "Dessert" },
    { id: 10, name: "Chicken Curry", quantity: 6, price: "$18.99", image: "chicken-curry.png", category: "Indian" },
    { id: 11, name: "Sushi Roll", quantity: 15, price: "$18.99", image: "sushi-roll.png", category: "Japanese" },
    { id: 12, name: "Lasagna", quantity: 8, price: "$16.99", image: "lasagna.png", category: "Italian" }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Changed to 8 as per the requirement
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const removeCategory = (id) => {
    if (!id) return;
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, category: null } : item
    );
    setData(updatedData);
  };

  const sortedItems = [...data].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredItems = sortedItems.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-300 mt-8 ml-4 mr-4">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2 flex">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-400 transition-colors flex items-center shadow-md">
            <span className="mr-2">Import Menu</span>
            <FileDown size={18} />
          </button>
            <ModalTrigger onClick={() => setIsModalOpen(true)} />
            <MenuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        <div className="flex items-center max-w-xs border rounded-lg overflow-hidden focus-within:border-primary">
          <div className="pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
          type="search"
          placeholder="Search menu item"
          className="pl-2 pr-4 py-2 w-full focus:outline-none focus:border-transparent"
          value={searchTerm}
          onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 font-semibold uppercase text-xs tracking-wider">
              <th className="py-3 px-4">
                Serial No
                <button onClick={() => requestSort("id")} className="ml-1">
                  {sortConfig.key === "id" ? (
                    sortConfig.direction === "ascending" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </th>
              <th className="py-3 px-4">
                Item Name
                <button onClick={() => requestSort("name")} className="ml-1">
                  {sortConfig.key === "name" ? (
                    sortConfig.direction === "ascending" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Item Price</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index === currentItems.length - 1 ? 'border-b-0' : ''}`}>
                <td className="py-3 px-4 text-gray-800">{item.id}</td>
                <td className="py-3 px-4 text-gray-800 font-medium">{item.name}</td>
                <td className="py-3 px-4 text-gray-800">{item.quantity}</td>
                <td className="py-3 px-4 text-gray-800">{item.price}</td>
                <td className="py-3 px-4 text-gray-800">{item.image}</td>
                <td className="py-3 px-4">
                  {item.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                      <button onClick={() => removeCategory(item.id)} className="ml-1 text-primary hover:text-blue-400">
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2 justify-center items-center">
                    <button className="text-primary hover:text-blue-500">
                      <Eye size={18} />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">{Math.min(indexOfLastItem, filteredItems.length)}</span> of{" "}
            <span className="font-medium">{filteredItems.length}</span> results
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-blue-600"
            } transition-colors`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-blue-600"
            } transition-colors`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItems;