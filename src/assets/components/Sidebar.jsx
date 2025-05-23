import React, { useState, useEffect} from "react";
import {
  FaChartPie ,
  FaThLarge,
  FaTable,
  FaCog,
  FaChartBar,
  FaLock,
} from "react-icons/fa";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";

function Sidebar() {
    const [activeItem,setActiveItem] = useState(null);
    
    const toggleItem = (label) => {
        setActiveItem(label === activeItem ? null : label);
    }
  return (
    <div className="">
    <div className="w-64 h-screen fixed left-0 z-10 bg-white shadow p-4 space-y-2 overflow-auto">
        
        <div className="flex items-center gap-2 text-[18px]  text-gray-600 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer p-2">
            <FaChartPie />
            <span>Dashboard</span>
        </div>
        
        <div>
            <div 
                className="flex items-center justify-between gap-2 text-[18px] text-gray-600 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer p-2"
                onClick={() => toggleItem('Layouts')}
            >
                <div className="flex items-center gap-2">
                    <FaThLarge />
                    <span>Layouts</span>
                </div>
                <span>{activeItem === "Layouts" ? <GoTriangleDown/> : <GoTriangleRight/>}</span>
            </div>
            <div>
                {activeItem === "Layouts" && (
                    <div className="text-1xl pt-2 text-gray-500">
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Stacked
                        </div>
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Sidebar
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        <div>
            <div 
                className="flex items-center justify-between gap-2 text-[18px] text-gray-600 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer p-2"
                onClick={() => toggleItem('CRUD')}
            >
                <div className="flex items-center gap-2">
                    <FaTable />
                    <span>CRUD</span>
                </div>
                <span>{activeItem === "CRUD" ? <GoTriangleDown/> : <GoTriangleRight/>}</span>
            </div>
            <div>
                {activeItem === "CRUD" && (
                    <div className="text-1xl pt-2 text-gray-500">
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Products
                        </div>
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Users
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        <div className="flex items-center gap-2 text-[18px]  text-gray-600 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer p-2">
            <FaCog />
            <span>Settings</span>
        </div>
        
        <div>
            <div 
                className="flex items-center justify-between gap-2 text-[18px] text-gray-600 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer p-2"
                onClick={() => toggleItem('Pages')}
            >
                <div className="flex items-center gap-2">
                    <FaChartBar />
                    <span>Pages</span>
                </div>
                <span>{activeItem === "Pages" ? <GoTriangleDown/> : <GoTriangleRight/>}</span>
            </div>
            <div>
                {activeItem === "Pages" && (
                    <div className="text-1xl pt-2 text-gray-500">
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Pricing
                        </div>
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Maintenance
                        </div>
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            404 not found
                        </div>
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            500 server error
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div>
            <div 
                className="flex items-center justify-between gap-2 text-[18px] text-gray-600 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer p-2"
                onClick={() => toggleItem('Authentication')}
            >
                <div className="flex items-center gap-2">
                    <FaLock />
                    <span>Authentication</span>
                </div>
                <span>{activeItem === "Authentication" ? <GoTriangleDown/> : <GoTriangleRight/>}</span>
            </div>
            <div>
                {activeItem === "Authentication" && (
                    <div className="text-1xl pt-2 text-gray-500">
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Sign in
                        </div>
                        <div className="p-2 pl-8 hover:bg-gray-100      hover:text-black rounded-md cursor-pointer">
                            Sign up
                        </div>
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Forgot password
                        </div>
                        <div className="p-2 pl-8 hover:bg-gray-100  hover:text-black rounded-md cursor-pointer">
                            Reset password
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    </div>
  )
}


export default Sidebar;
