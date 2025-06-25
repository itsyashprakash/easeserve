"use client"
import { useState } from 'react';
import { FiPlusCircle, FiEdit, FiTrash2, FiX } from 'react-icons/fi';

const mockOrders = [
    { id: 1, orderNumber: '#101', status: 'preparing', items: ['Burger x 1', 'Fries x 1'] },
    { id: 2, orderNumber: '#102', status: 'ready', items: ['Pizza x 1', 'Soda x 2'] },
    { id: 3, orderNumber: '#103', status: 'delivered', items: ['Pasta x 1'] },
    { id: 4, orderNumber: '#104', status: 'preparing', items: ['Salad x 1'] },
    { id: 5, orderNumber: '#105', status: 'ready', items: ['Sandwich x 1'] },
];

// Mock Payment Data (replace with localStorage later)
const initialPayments = [
    { id: 1, orderId: '#101', orderType: 'dine-in', paymentMethod: 'card', paymentStatus: 'paid', date: '2023-10-27', time: '14:30' },
    { id: 2, orderId: '#102', orderType: 'takeway', paymentMethod: 'upi', paymentStatus: 'paid', date: '2023-10-27', time: '15:00' },
    { id: 3, orderId: '#103', orderType: 'delivery', paymentMethod: 'cash', paymentStatus: 'unpaid', date: '2023-10-27', time: '16:00' },
];

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState('all orders');

    // State for managing payments (will use localStorage later)
    const [payments, setPayments] = useState(initialPayments);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null); // null for adding, payment object for editing
    const [paymentFormData, setPaymentFormData] = useState({ orderId: '', orderType: 'dine-in', paymentMethod: 'cash', paymentStatus: 'unpaid', date: '', time: '' });

    // Effect to load/save payments from/to localStorage (implement later)

    const filteredOrders = activeTab === 'all orders'
        ? mockOrders
        : mockOrders.filter(order => order.status === activeTab);

    const getStatusBadge = (status) => {
        const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
        
        const statusConfig = {
            preparing: {
                bg: 'bg-yellow-100',
                text: 'text-yellow-800',
                icon: '⏳',
                label: 'Preparing'
            },
            ready: {
                bg: 'bg-blue-100',
                text: 'text-blue-800',
                icon: '✅',
                label: 'Ready'
            },
            delivered: {
                bg: 'bg-green-100',
                text: 'text-green-800',
                icon: '🚚',
                label: 'Delivered'
            },
            default: {
                bg: 'bg-gray-100',
                text: 'text-gray-800',
                icon: 'ℹ️',
                label: status
            }
        };

        const config = statusConfig[status] || statusConfig.default;
        
        return (
            <span className={`${baseClasses} ${config.bg} ${config.text} capitalize`}>
                {config.icon} <span className="ml-1">{config.label}</span>
            </span>
        );
    };

    const getTimeAgo = () => {
        const minutes = Math.floor(Math.random() * 60);
        return `${minutes} min ago`;
    };

    // Function to format price in Indian Rupees
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Mock price mapping for items
    const getItemPrice = (item) => {
        const priceMap = {
            'Burger': 199,
            'Fries': 99,
            'Pizza': 299,
            'Soda': 49,
            'Pasta': 249,
            'Salad': 179,
            'Sandwich': 149
        };
        
        const itemName = item.split(' x ')[0];
        const quantity = parseInt(item.split(' x ')[1]) || 1;
        const basePrice = priceMap[itemName] || 99;
        
        return {
            basePrice,
            total: basePrice * quantity,
            quantity
        };
    };

    const renderOrderCard = (order) => {
        const orderItems = order.items.map(item => ({
            name: item,
            ...getItemPrice(item)
        }));
        
        const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);

        return (
            <div 
                key={order.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer w-full sm:max-w-xs"
                onClick={() => alert(`Order Status: ${order.status}`)}
            >
                {/* Header Section */}
                <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Order {order.orderNumber}</h3>
                            <p className="text-sm text-gray-500 mt-1">{getTimeAgo()}</p>
                        </div>
                        <div className="mt-1">
                            {getStatusBadge(order.status)}
                        </div>
                    </div>
                </div>
                
                {/* Items Section */}
                <div className="px-5 py-3">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-medium text-gray-700">Items ({order.items.length})</h4>
                        <span className="text-xs text-gray-500">Qty × Price</span>
                    </div>
                    
                    <ul className="space-y-3">
                        {orderItems.map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                                <span className="text-gray-700 font-medium">{item.name.split(' x ')[0]}</span>
                                <div className="text-right">
                                    <div className="text-gray-900 font-medium">{formatPrice(item.total)}</div>
                                    <div className="text-xs text-gray-500">{item.quantity} × {formatPrice(item.basePrice)}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Order Summary */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <span className="text-gray-800 font-medium">{formatPrice(orderTotal)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-600">GST (5%)</span>
                            <span className="text-gray-800 font-medium">{formatPrice(orderTotal * 0.05)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <span className="text-base font-semibold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-blue-600">{formatPrice(orderTotal * 1.05)}</span>
                        </div>
                    </div>
                </div>
                
                {/* Footer Actions */}
                <div className="px-5 py-3 bg-gray-50 rounded-b-xl">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                            <button 
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Add edit functionality
                                }}
                                title="Edit Order"
                            >
                                <FiEdit size={18} />
                            </button>
                            <button 
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Add delete functionality
                                }}
                                title="Delete Order"
                            >
                                <FiTrash2 size={18} />
                            </button>
                        </div>
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Add view details functionality
                            }}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const handleAddPaymentClick = () => {
        setEditingPayment(null);
        setPaymentFormData({ orderId: '', orderType: 'dine-in', paymentMethod: 'cash', paymentStatus: 'unpaid', date: '', time: '' });
        setShowPaymentModal(true);
    };

    const handleEditPaymentClick = (payment) => {
        setEditingPayment(payment);
        setPaymentFormData(payment);
        setShowPaymentModal(true);
    };

    const handleDeletePaymentClick = (paymentId) => {
        if (window.confirm('Are you sure you want to delete this payment record?')) {
            setPayments(payments.filter(payment => payment.id !== paymentId));
        }
    };

    const handlePaymentFormInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentFormData({ ...paymentFormData, [name]: value });
    };

    const handlePaymentFormSubmit = (e) => {
        e.preventDefault();
        if (editingPayment) {
            // Update existing payment
            setPayments(payments.map(payment =>
                payment.id === editingPayment.id ? { ...payment, ...paymentFormData } : payment
            ));
        } else {
            // Add new payment
            const newPayment = { id: Date.now(), ...paymentFormData }; // Simple ID generation
            setPayments([...payments, newPayment]);
        }
        setShowPaymentModal(false);
        setEditingPayment(null);
        setPaymentFormData({ orderId: '', orderType: 'dine-in', paymentMethod: 'cash', paymentStatus: 'unpaid', date: '', time: '' });
    };

    const handleCancelPaymentForm = () => {
        setShowPaymentModal(false);
        setEditingPayment(null);
        setPaymentFormData({ orderId: '', orderType: 'dine-in', paymentMethod: 'cash', paymentStatus: 'unpaid', date: '', time: '' });
    };

    return (
        <div className="container mx-auto py-6 px-6 flex flex-col h-[calc(100vh-85px)]">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>

            <div className="bg-white p-6 rounded-lg shadow flex-1 overflow-y-auto hide-scrollbar">
                {/* Tabs Navigation */}
                <div className="border-b">
                    <div className="flex space-x-4 px-6">
                        {[ 'all orders', 'preparing', 'ready', 'delivered', 'payment'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-2 border-b-2 capitalize ${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab !== 'payment' ? (
                        filteredOrders.length > 0 ? (
                            <div className="flex flex-wrap gap-4">
                                {filteredOrders.map(order => renderOrderCard(order))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No orders found in this category.</p>
                        )
                    ) : (
                        <div className="space-y-4">
                            <button onClick={handleAddPaymentClick} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center">
                                <FiPlusCircle className="mr-2" />
                                Add New Payment
                            </button>
                            {/* Payment Records List */}
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="text-xl font-semibold mb-4">Payment Records</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {payments.map((payment) => (
                                                <tr key={payment.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.orderId}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{payment.orderType}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{payment.paymentMethod}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{payment.paymentStatus}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.time}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button onClick={() => handleEditPaymentClick(payment)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                                                        <button onClick={() => handleDeletePaymentClick(payment.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

             {/* Payment Form Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" id="payment-form-modal">
                    <div className="relative p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                             <button
                                onClick={handleCancelPaymentForm}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={24} />
                            </button>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{editingPayment ? 'Edit Payment' : 'Add New Payment'}</h3>
                            <form onSubmit={handlePaymentFormSubmit} className="space-y-4 text-left">
                                <div>
                                    <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
                                    <input type="text" id="orderId" name="orderId" value={paymentFormData.orderId} onChange={handlePaymentFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div>
                                    <label htmlFor="orderType" className="block text-sm font-medium text-gray-700">Order Type</label>
                                    <select id="orderType" name="orderType" value={paymentFormData.orderType} onChange={handlePaymentFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                                        <option value="dine-in">Dine-In</option>
                                        <option value="takeway">Takeway</option>
                                        <option value="delivery">Delivery</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                                    <select id="paymentMethod" name="paymentMethod" value={paymentFormData.paymentMethod} onChange={handlePaymentFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                                        <option value="cash">Cash</option>
                                        <option value="card">Card</option>
                                        <option value="upi">UPI</option>
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700">Payment Status</label>
                                    <select id="paymentStatus" name="paymentStatus" value={paymentFormData.paymentStatus} onChange={handlePaymentFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                                        <option value="paid">Paid</option>
                                        <option value="unpaid">Unpaid</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                    <input type="date" id="date" name="date" value={paymentFormData.date} onChange={handlePaymentFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                                    <input type="time" id="time" name="time" value={paymentFormData.time} onChange={handlePaymentFormInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button type="button" onClick={handleCancelPaymentForm} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">{editingPayment ? 'Update Payment' : 'Add Payment'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 