import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Settings, Tickets, LogOut } from 'lucide-react';
import NavbarSearchbar from './NavbarSearchbar';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isTicketHovered, setIsTicketHovered] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const location = useLocation(); // Access the current route

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section className="flex justify-between px-4 py-5 items-center border-b border-gray-300">
            {/* Conditionally render NavbarSearchbar only on "/" route */}
            {location.pathname === '/' && <NavbarSearchbar />}

            {/* Right-aligned Ticket Creation and User Profile if not on "/" */}
            <div
                className={`flex items-center ${location.pathname !== '/' ? 'ml-auto' : ''}`}
            >
                {/* Ticket Creation */}
                <div
                    className="flex flex-col mr-12 bg-white p-2 rounded-lg border border-gray-300 items-center relative"
                    onMouseEnter={() => setIsTicketHovered(true)}
                    onMouseLeave={() => setIsTicketHovered(false)}
                >
                    <Tickets color="#3786E2" size={24} />
                    {isTicketHovered && (
                        <span className="absolute top-full mt-2 bg-primary text-white px-2 py-1 rounded shadow-md text-sm whitespace-nowrap">
                            Create Ticket
                        </span>
                    )}
                </div>

                {/* User Profile Section */}
                <div className="flex items-center relative" ref={profileRef}>
                    <img
                        src="https://placehold.co/10"
                        alt="Profile avatar of Yash Gurav"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div
                        className="flex flex-col cursor-pointer"
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    >
                        <h1 className="font-semibold text-sm">Yash Gurav</h1>
                        <span className="text-sm text-gray-500 flex">
                            Cashier <span className="mt-0.5 ml-1"><ChevronDown size={16} /></span>
                        </span>
                    </div>
                    {isProfileDropdownOpen && (
                        <div className="flex flex-col absolute top-full right-0 mt-1 text-sm text-gray-500 bg-white border px-4 py-2 border-gray-300 space-y-2 rounded-lg shadow-md">
                            <p className="cursor-pointer hover:text-gray-700 flex items-center">
                                <Settings size={14} /><span className="ml-2">Settings</span>
                            </p>
                            <p className="cursor-pointer hover:text-gray-700 flex items-center">
                                <LogOut size={14} /> <span className="ml-2">Logout</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Navbar;
