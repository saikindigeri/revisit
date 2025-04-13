import React from "react";
import { MdOutlineHome, MdOutlineCategory, MdOutlinePeople, MdOutlineReport, MdOutlineSettings } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineGift, AiOutlineMail } from "react-icons/ai";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <MdOutlineHome className="text-xl" /> },
    { name: "Products", icon: <AiOutlineShoppingCart className="text-xl" /> },
    { name: "Categories", icon: <MdOutlineCategory className="text-xl" /> },
    { name: "Customers", icon: <MdOutlinePeople className="text-xl" /> },
    { name: "Reports", icon: <MdOutlineReport className="text-xl" /> },
    { name: "Coupons", icon: <AiOutlineGift className="text-xl" /> },
    { name: "Inbox", icon: <AiOutlineMail className="text-xl" /> },
    { name: "Settings", icon: <MdOutlineSettings className="text-xl" /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#102840] text-white">
      <ul className="flex flex-col">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-3 p-4 hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;