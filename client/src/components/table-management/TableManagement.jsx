import { useState, useEffect, useRef } from 'react';
import { FiPlusCircle, FiEdit, FiTrash2, FiX, FiXCircle, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const initialTables = [
  { id: 1, name: 'T1', status: 'vacant', shape: 'square', capacity: 4, seats: Array(4).fill(null).map((_, index) => ({ seatNumber: index + 1, orders: [] })) },
  { id: 2, name: 'T2', status: 'occupied', shape: 'square', capacity: 2, seats: Array(2).fill(null).map((_, index) => ({ seatNumber: index + 1, orders: [] })) },
  { id: 3, name: 'T3', status: 'reserved', shape: 'square', capacity: 6, seats: Array(6).fill(null).map((_, index) => ({ seatNumber: index + 1, orders: [] })) },
  { id: 4, name: 'T4', status: 'vacant', shape: 'square', capacity: 4, seats: Array(4).fill(null).map((_, index) => ({ seatNumber: index + 1, orders: [] })) },
  { id: 5, name: 'T5', status: 'occupied', shape: 'square', capacity: 2, seats: Array(2).fill(null).map((_, index) => ({ seatNumber: index + 1, orders: [] })) },
  { id: 6, name: 'T6', status: 'vacant', shape: 'square', capacity: 6, seats: Array(6).fill(null).map((_, index) => ({ seatNumber: index + 1, orders: [] })) },
];

export default function TableManagement() {
  const [tables, setTables] = useState(() => {
    // Initialize state from localStorage or use initialTables
    const savedTables = typeof window !== 'undefined' ? localStorage.getItem('tables') : null;
    let parsedTables = savedTables ? JSON.parse(savedTables) : initialTables;

    // Ensure seats structure exists in loaded data (for compatibility with old localStorage data)
    parsedTables = parsedTables.map(table => {
      if (!table.seats || !Array.isArray(table.seats) || table.seats.length !== table.capacity) {
        return { ...table, seats: Array(table.capacity).fill(null).map((_, index) => ({ seatNumber: index + 1, orders: [] })) };
      }
      return table;
    });

    return parsedTables;
  });

  // State for managing the add/edit form
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null); // null for adding, table object for editing
  const [formData, setFormData] = useState({ name: '', capacity: '', status: 'vacant' });

  // State for managing the table details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [activeSeatTab, setActiveSeatTab] = useState(1); // Default to the first seat

  // Save tables state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tables', JSON.stringify(tables));
    }
  }, [tables]);

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setShowDetailsModal(true);
    setActiveSeatTab(1); // Reset to the first seat when opening a new table
  };

  const handleAddTableClick = () => {
    setEditingTable(null);
    setFormData({ name: '', capacity: '', status: 'vacant' });
    setShowFormModal(true);
  };

  const handleEditTableClick = (table) => {
    setEditingTable(table);
    setFormData({ name: table.name, capacity: table.capacity, status: table.status });
    setShowFormModal(true);
  };

  const handleDeleteTableClick = (tableId) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      setTables(tables.filter(table => table.id !== tableId));
    }
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingTable) {
      // Update existing table
      setTables(tables.map(table =>
        table.id === editingTable.id ? { ...table, ...formData, capacity: parseInt(formData.capacity, 10) } : table
      ));
    } else {
      // Add new table
      const newTable = { id: Date.now(), ...formData, capacity: parseInt(formData.capacity, 10) }; // Simple ID generation
      setTables([...tables, newTable]);
    }
    setShowFormModal(false);
    setEditingTable(null);
    setFormData({ name: '', capacity: '', status: 'vacant' });
  };

  const handleCancelForm = () => {
    setShowFormModal(false);
    setEditingTable(null);
    setFormData({ name: '', capacity: '', status: 'vacant' });
  };

  const handleSeatTabClick = (seatNumber) => {
    setActiveSeatTab(seatNumber);
  };

  const handlePrintBill = () => {
    if (!selectedTable) return;
    // Here you would trigger the printing functionality
    // For now, we'll just show a success message in the UI
    const message = `Printing bill for Seat ${activeSeatTab} at Table ${selectedTable.name}`;
    // TODO: Replace with proper toast/notification system
    alert(message);
  };

  const handleAddOrder = () => {
    if (!selectedTable) return;
    // Simulate adding an order item (replace with actual order logic later)
    const newItem = { id: Date.now(), name: `Item ${Date.now()}`, price: 10 };

    setTables(tables.map(table =>
      table.id === selectedTable.id
        ? {
            ...table,
            seats: table.seats.map(seat =>
              seat.seatNumber === activeSeatTab
                ? { ...seat, orders: [...seat.orders, newItem] }
                : seat
            )
          }
        : table
    ));

    // Update selectedTable state to reflect the change immediately in the modal
    setSelectedTable(prevTable => {
      if (!prevTable) return null;
      const updatedSeats = prevTable.seats.map(seat =>
        seat.seatNumber === activeSeatTab
          ? { ...seat, orders: [...seat.orders, newItem] }
          : seat
      );
      return { ...prevTable, seats: updatedSeats };
    });

    // TODO: Replace with proper toast/notification system
    alert(`Added item to Seat ${activeSeatTab}`);
  };

  const handleRemoveOrderItem = (seatNumber, orderId) => {
    if (!selectedTable) return;

    setTables(tables.map(table =>
      table.id === selectedTable.id
        ? {
            ...table,
            seats: table.seats.map(seat =>
              seat.seatNumber === seatNumber
                ? { ...seat, orders: seat.orders.filter(order => order.id !== orderId) }
                : seat
            )
          }
        : table
    ));

    // Update selectedTable state to reflect the change immediately in the modal
    setSelectedTable(prevTable => {
        if (!prevTable) return null;
        const updatedSeats = prevTable.seats.map(seat =>
             seat.seatNumber === seatNumber
                ? { ...seat, orders: seat.orders.filter(order => order.id !== orderId) }
                : seat
        );
        return { ...prevTable, seats: updatedSeats };
    });
  };

  // Ref for the tabs container to enable scrolling with buttons
  const tabsRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 200; // Adjust scroll amount as needed
      if (direction === 'left') {
        tabsRef.current.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        tabsRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'vacant': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'reserved': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  const hasAnyOrder = selectedTable?.seats?.some(seat => seat.orders.length > 0) ?? false;

  return (
    <div className="container mx-auto py-6 px-6 flex flex-col h-[calc(100vh-85px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Table Management</h1>
        <button onClick={handleAddTableClick} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
          <FiPlusCircle className="mr-2" />
          Add New Table
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow flex-1 overflow-y-auto hide-scrollbar">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`p-4 border rounded-lg shadow cursor-pointer flex flex-col items-center justify-center ${getStatusColor(table.status)}`}
              onClick={() => handleTableClick(table)}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{table.name}</h3>
              <p className="text-sm text-white mb-1">Capacity: {table.capacity}</p>
              <p className="text-sm text-white capitalize mb-4">Status: {table.status}</p>
              <div className="flex space-x-4">
                <button onClick={(e) => { e.stopPropagation(); handleEditTableClick(table); }} className="text-white hover:text-blue-200">
                  <FiEdit size={20} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteTableClick(table.id); }} className="text-white hover:text-red-200">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Table Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" id="form-modal">
          <div className="relative p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <button
                onClick={handleCancelForm}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{editingTable ? 'Edit Table' : 'Add New Table'}</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Table Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required min="1" />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select id="status" name="status" value={formData.status} onChange={handleFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option value="vacant">Vacant</option>
                    <option value="occupied">Occupied</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button type="button" onClick={handleCancelForm} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">{editingTable ? 'Update Table' : 'Add Table'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Table Details Modal */}
      {showDetailsModal && selectedTable && Array.isArray(selectedTable.seats) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" id="my-modal">
          <div className="relative p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedTable.name} Details (Capacity: {selectedTable.capacity})</h3>
              <div className="mt-2 px-7 py-3">
                {/* Seat Tabs with Scroll Buttons */}
                <div className="flex items-center">
                  {selectedTable.capacity > 8 && (
                    <button
                      onClick={() => scrollTabs('left')}
                      className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Scroll left"
                    >
                      <FiArrowLeft size={20} />
                    </button>
                  )}
                  <div className="border-b border-gray-200 flex-1 overflow-hidden">
                    <nav ref={tabsRef} className={`-mb-px flex flex-nowrap space-x-8 ${selectedTable.capacity > 8 ? 'overflow-x-auto hide-scrollbar pb-2' : ''}`} aria-label="Tabs">
                      {selectedTable.seats.map((seat, index) => {
                        const seatNumber = seat.seatNumber;
                        return (
                          <button
                            key={seatNumber}
                            onClick={() => handleSeatTabClick(seatNumber)}
                            className={`${activeSeatTab === seatNumber ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                          >
                            Seat {seatNumber}
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                  {selectedTable.capacity > 8 && (
                    <button
                      onClick={() => scrollTabs('right')}
                      className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Scroll right"
                    >
                      <FiArrowRight size={20} />
                    </button>
                  )}
                </div>

                {/* Bill Display Area */}
                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-600 uppercase mb-4">Bill Details for Seat {activeSeatTab}</h4>

                  {/* Ordered Items List */}
                  {
                    selectedTable.seats.find(seat => seat.seatNumber === activeSeatTab)?.orders?.length > 0 ?
                    (
                      <div className={`space-y-3 ${selectedTable.seats.find(seat => seat.seatNumber === activeSeatTab).orders.length > 4 ? 'max-h-48 overflow-y-auto hide-scrollbar' : ''}`}>
                        {selectedTable.seats.find(seat => seat.seatNumber === activeSeatTab).orders.map(order => (
                          <div key={order.id} className="flex justify-between items-center">
                            <span className="text-gray-700">{order.name} x 1</span> {/* Assuming quantity 1 for mock */}
                            <span className="flex items-center">
                              <span className="text-gray-700 mr-2">₹{order.price.toFixed(2)}</span>
                              <button
                                onClick={() => handleRemoveOrderItem(activeSeatTab, order.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FiXCircle size={18} />
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                    :
                    <p className="text-gray-600">No orders for this seat yet.</p>
                  }

                  {/* Separator */}
                  <hr className="my-4 border-gray-300" />

                  {/* Summary Section (Placeholders) */}
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Item Total</span>
                      <span>₹{selectedTable.seats.find(seat => seat.seatNumber === activeSeatTab)?.orders?.reduce((sum, order) => sum + order.price, 0).toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order Packing Charges</span>
                      <span>₹0.00</span>{/* Mock Value */}
                    </div>
                     <div className="flex justify-between">
                      <span>Platform Fee</span>
                      <span>₹0.00</span>{/* Mock Value */}
                    </div>
                     <div className="flex justify-between">
                      <span>Discount Applied</span>
                      <span>-₹0.00</span>{/* Mock Value */}
                    </div>
                     <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹0.00</span>{/* Mock Value */}
                    </div>
                     <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>₹0.00</span>{/* Mock Value */}
                    </div>
                  </div>

                   {/* Separator */}
                  <hr className="my-4 border-gray-300" />

                  {/* Total Section */}
                   <div className="flex justify-between items-center font-semibold text-lg mt-4">
                     <span>Bill Total</span>
                     <span>₹{selectedTable.seats.find(seat => seat.seatNumber === activeSeatTab)?.orders?.reduce((sum, order) => sum + order.price, 0).toFixed(2) || '0.00'}</span>
                   </div>

                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-end space-x-4">
                  {selectedTable.seats.find(seat => seat.seatNumber === activeSeatTab)?.orders?.length > 0 ?
                    (
                      <button
                        onClick={handlePrintBill}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Print Bill for Seat {activeSeatTab}
                      </button>
                    )
                    :
                    (
                      <button
                        onClick={handleAddOrder}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Add Order
                      </button>
                    )
                  }
                  {hasAnyOrder && (
                    <button
                      onClick={handlePrintBill}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Print Table Bill
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 