import React, { useState } from 'react';
import Projectlogo from '../assets/Logo.png';
import { HomeIcon, CircleStackIcon, EyeIcon, ChartBarSquareIcon, FlagIcon, CheckCircleIcon, QuestionMarkCircleIcon, QueueListIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ onSidebarToggle }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
        onSidebarToggle(true); // Notify the parent component that the sidebar is open
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        onSidebarToggle(false); // Notify the parent component that the sidebar is closed
    };

    return (
        <div 
            className={`${isOpen ? 'w-64' : 'w-20'} h-full bg-white shadow-md fixed transition-all duration-300`}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center justify-center h-24 border-b">
                <img src={Projectlogo} alt="Logo" className={`${isOpen ? 'h-20 w-20' : 'h-12 w-12'} transition-all duration-300`} />
            </div>
            <ul className="mt-2 font-lato">
                <li className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'}`}>
                    <HomeIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                    {isOpen && <span className="text-tblue">Main Dashboard</span>}
                </li>
                <li className={`py-4 px-4 my-2 bg-orange-100 hover:bg-orange-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'}`}>
                    <CircleStackIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                    {isOpen && <span className="text-tblue">Procurement Transparency</span>}
                </li>
                <li className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'}`}>
                    <EyeIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                    {isOpen && <span className="text-tblue">Risk Management</span>}
                </li>
                <li className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'}`}>
                    <ChartBarSquareIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                    {isOpen && <span className="text-tblue">Project Performance</span>}
                </li>
                <li className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'}`}>
                    <FlagIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                    {isOpen && <span className="text-tblue">Risks & Red Flags</span>}
                </li>
                <li className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'}`}>
                    <CheckCircleIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                    {isOpen && <span className="text-tblue">Stakeholder Feedback</span>}
                </li>
            </ul>
            <div className="absolute bottom-0 w-full py-4 px-4">
                <div className="flex items-center justify-between">
                    <QueueListIcon className="h-6 w-6 text-gray-600 mr-2" />
                    {isOpen && <span className="text-gray-600">Settings</span>}
                    <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600 mr-2" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
