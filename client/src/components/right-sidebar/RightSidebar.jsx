import React, { useState } from 'react';
import { Minus, Plus, X, Banknote, CreditCard, Smartphone } from 'lucide-react';
import SearchableDropdown from './SearchableDropdown';

const RightSideBar = ({ items, onQuantityChange, onRemoveItem }) => {
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const paymentMethods = [
        { value: 'cash', icon: <Banknote size={24} /> },
        { value: 'card', icon: <CreditCard size={24} /> },
        { value: 'upi', icon: <Smartphone size={24} /> },
    ];
    const [orderType, setOrderType] = useState("dine-in");
    const employee = ["John Doe", "Shankar Karia", "Ashok Gupta", "Kallu Kalia", "Shyam Tiwari"];
    const tableNO = ["T1", "T2", "T3", "T4", "t5"];

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = 25;
    const total = subtotal + tax;

    return (
        <aside className="flex flex-col w-full lg:w-86 bg-white border-l border-gray-300 h-screen overflow-hidden">
            <div className="flex flex-col h-full pt-4 pl-4 pr-4">
                {/* Header Section */}
                <div className="flex flex-col">
                    <h1 className="font-bold text-primary">
                        Order <span className="text-black">Details</span>
                    </h1>
                    <div className="flex items-center space-x-4 mt-2">
                        <div className="flex-1">
                            <SearchableDropdown options={employee} label="Order Taken By" placeholder="Employee" />
                        </div>
                        <div className="flex-1">
                            <SearchableDropdown options={tableNO} label="Select Table" placeholder="Table No" />
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area (Items + Order Type) */}
                <div className="flex-1 overflow-y-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Items List */}
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-b-0">
                                <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                                    <div className="text-gray-600 text-sm">Rs. {item.price}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                                        onClick={() => onQuantityChange(item.id, -1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                                    <button
                                        className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100"
                                        onClick={() => onQuantityChange(item.id, 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </button>
                                    <button
                                        className="h-7 w-7 flex items-center justify-center text-gray-400 hover:text-gray-600"
                                        onClick={() => onRemoveItem(item.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fixed Bottom Section */}
                <div className="pt-4 border-t bg-white pb-4">
                    {/* Order Type Selection */}
                    <div className="flex justify-between mt-2 mb-2 pt-2 pb-2">
                        {['dine-in', 'delivery', 'takeaway'].map((type) => (
                            <label key={type} className="flex items-center space-x-1 cursor-pointer text-sm">
                                <input
                                    type="radio"
                                    name="orderType"
                                    value={type}
                                    checked={orderType === type}
                                    onChange={(e) => setOrderType(e.target.value)}
                                    className="form-radio text-primary"
                                />
                                <span className="capitalize">{type.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>
                    
                    {/* Order Summary */}
                    <div className="text-sm space-y-1 pb-4">
                        <div className="flex justify-between">
                            <span>OrderID</span>
                            <span className="font-medium">#91203</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{Math.round(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>₹0</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>₹{tax}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>₹{Math.round(total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-2 mt-4">
                        <label className="text-sm block">Payment Method</label>
                        <div className="grid grid-cols-3 gap-1">
                            {paymentMethods.map((method) => (
                                <label
                                    key={method.value}
                                    className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer text-center ${
                                        paymentMethod === method.value 
                                        ? 'border-primary bg-primary/5' 
                                        : 'border-gray-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.value}
                                        checked={paymentMethod === method.value}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="sr-only"
                                    />
                                    {method.icon}
                                    <span className="block text-xs capitalize mt-1">{method.value}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Continue Button */}
                    <button className="w-full bg-primary hover:bg-blue-300 text-white py-2 px-4 rounded-lg transition-colors text-sm mt-6 mb-2">
                        Continue to Payment
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default RightSideBar;