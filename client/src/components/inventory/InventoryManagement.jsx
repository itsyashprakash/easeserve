"use client"
import { useState, useEffect } from "react"
import { format, isAfter, addDays } from "date-fns"
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit2, 
  FiTrash2, 
  FiAlertTriangle,
  FiPackage,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiPlusCircle
} from "react-icons/fi"
import SearchableDropdown from "../right-sidebar/SearchableDropdown"

// Categories for filtering
const categories = ["All", "Grains", "Produce", "Dairy", "Beverages", "Spices", "Meat", "Frozen"]

// Units for selection
const units = ["kg", "g", "L", "ml", "pcs", "box", "pack"]

// Initial mock data
const initialInventory = [
    {
      id: 1,
      name: "Basmati Rice",
      category: "Grains",
      quantity: 50,
      unit: "kg",
    expiry: addDays(new Date(), 30),
      alertThreshold: 5,
    supplier: "India Gate",
    price: 120
    },
    {
      id: 2,
      name: "Tomatoes",
      category: "Produce",
    quantity: 15,
    unit: "kg",
    expiry: addDays(new Date(), 5),
    alertThreshold: 10,
    supplier: "Local Farm",
    price: 40
  },
  {
    id: 3,
    name: "Milk",
    category: "Dairy",
    quantity: 20,
    unit: "L",
    expiry: addDays(new Date(), 2),
    alertThreshold: 5,
    supplier: "Amul",
    price: 60
  }
]

export default function InventoryManagement() {
  // State management
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [activeTab, setActiveTab] = useState("inventory")
  const [inventoryItems, setInventoryItems] = useState([])
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Grains",
    quantity: "",
    unit: "kg",
    expiry: "",
    alertThreshold: "",
    supplier: "",
    price: ""
  })

  // Initialize with mock data
  useEffect(() => {
    const savedItems = localStorage.getItem('inventory')
    if (savedItems) {
      setInventory(JSON.parse(savedItems).map(item => ({
        ...item,
        expiry: new Date(item.expiry)
      })))
    } else {
      setInventory(initialInventory)
      localStorage.setItem('inventory', JSON.stringify(initialInventory))
    }
    setLoading(false)
  }, [])

  // Save to localStorage when items change
  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem('inventory', JSON.stringify(inventory))
      localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems))
    }
  }, [inventoryItems])

  // Filter and search functionality
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Check if item is low in stock
  const isLowStock = (item) => item.quantity <= item.alertThreshold

  // Check if item is expired or expiring soon (within 3 days)
  const getExpiryStatus = (expiryDate) => {
    const today = new Date()
    const threeDaysFromNow = addDays(today, 3)
    
    if (isAfter(today, expiryDate)) return 'expired'
    if (isAfter(threeDaysFromNow, expiryDate)) return 'expiring-soon'
    return 'good'
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'alertThreshold' || name === 'price' 
        ? Number(value) 
        : value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingItem) {
      // Update existing item
      setInventoryItems(inventoryItems.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id, expiry: new Date(formData.expiry) }
          : item
      ))
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: inventoryItems.length > 0 ? Math.max(...inventoryItems.map(i => i.id)) + 1 : 1,
        expiry: new Date(formData.expiry)
      }
      setInventoryItems([...inventoryItems, newItem])
    }
    handleCloseModal()
  }

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      expiry: format(item.expiry, 'yyyy-MM-dd'),
      alertThreshold: item.alertThreshold,
      supplier: item.supplier || "",
      price: item.price || ""
    })
    setIsModalOpen(true)
  }

  // Handle delete button click
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventoryItems(inventoryItems.filter(item => item.id !== id))
    }
  }

  // Close modal and reset form
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData({
      name: "",
      category: "Grains",
      quantity: "",
      unit: "kg",
      expiry: "",
      alertThreshold: "",
      supplier: "",
      price: ""
    })
  }

  // Additional mock data
  const additionalInventory = [
    {
      id: 3,
      name: "Vegetable Oil",
      category: "Oils",
      quantity: 10,
      unit: "L",
      expiry: new Date(2024, 2, 1),
      alertThreshold: 2,
    },
    {
      id: 4,
      name: "Chicken Breasts",
      category: "Meat",
      quantity: 15,
      unit: "kg",
      expiry: new Date(2023, 7, 20),
      alertThreshold: 3,
    }
  ]

  // Suppliers State
  const [suppliers] = useState([
    { id: 1, name: "Acme Foods", contact: "1234567890" },
    { id: 2, name: "Fresh Produce", contact: "0987654321" },
    { id: 3, name: "Poultry Suppliers", contact: "5678901234" },
  ])

  // Deliveries State
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      item: "Basmati Rice",
      supplier: "Grains Inc.",
      quantity: 25,
      unit: "kg",
      deliveryDate: new Date(2023, 5, 15),
      updateInventory: false,
    },
    {
      id: 2,
      item: "Onions",
      supplier: "Produce Co.",
      quantity: 15,
      unit: "kg",
      deliveryDate: new Date(2023, 5, 18),
      updateInventory: false,
    },
    {
      id: 3,
      item: "Chicken Breasts",
      supplier: "Meat Suppliers",
      quantity: 20,
      unit: "kg",
      deliveryDate: new Date(2023, 5, 20),
      updateInventory: false,
    }
  ])

  // Toggle delivery update status
  const toggleDeliveryUpdate = (id) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === id
        ? { ...delivery, updateInventory: !delivery.updateInventory }
        : delivery
    ))
  }

  // Handle inventory adjustment
  const handleAdjustmentChange = (id, value) => {
    setInventoryItems(inventoryItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + value) }
        : item
    ))
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'inventory':
        return (
          <div className="space-y-4">
            {/* Inventory content */}
          </div>
        )
      case 'suppliers':
        return (
          <div className="space-y-4">
            {/* Suppliers content */}
          </div>
        )
      case 'deliveries':
        return (
          <div className="space-y-4">
            {/* Deliveries content */}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
      </div>

      {/* Add New Item Button */}
      <div className="mb-6">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FiPlusCircle className="mr-2" />
          Add New Item
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b">
          <div className="flex space-x-4 px-6">
            {['inventory', 'suppliers', 'deliveries'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 capitalize ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
          <div className="p-6">
          {activeTab === 'inventory' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.supplier}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(item.expiry, 'yyyy-MM-dd')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isLowStock(item) ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FiEdit2 className="inline-block" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {suppliers.map((supplier) => (
                      <tr key={supplier.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {supplier.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {supplier.contact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">
                            <FiEdit2 className="inline-block" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <FiTrash2 className="inline-block" />
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}

          {activeTab === 'deliveries' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deliveries.map((delivery) => (
                      <tr key={delivery.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {delivery.item}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {delivery.supplier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {delivery.quantity} {delivery.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(delivery.deliveryDate, 'yyyy-MM-dd')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            delivery.updateInventory 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {delivery.updateInventory ? 'Updated' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleDeliveryUpdate(delivery.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {delivery.updateInventory ? 'Mark Pending' : 'Mark Updated'}
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" id="inventory-form-modal">
          <div className="relative p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <SearchableDropdown
                  options={categories.filter(cat => cat !== 'All')}
                  value={formData.category}
                  onChange={(value) => handleInputChange({ target: { name: 'category', value } })}
                  placeholder="Select Category"
                  label=""
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <SearchableDropdown
                    options={units}
                    value={formData.unit}
                    onChange={(value) => handleInputChange({ target: { name: 'unit', value } })}
                    placeholder="Select Unit"
                    label=""
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                  type="date"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alert Threshold</label>
                  <input
                  type="number"
                  name="alertThreshold"
                  value={formData.alertThreshold}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
              </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                >
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}