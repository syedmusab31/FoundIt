import React from "react";
import { FaSearch, FaCamera, FaUserCircle, FaEdit, FaCheckCircle } from "react-icons/fa";

const checkpointsLost = [
  { icon: <FaSearch />, text: "Browse found items" },
  { icon: <FaUserCircle />, text: "Create an account or login" },
  { icon: <FaCamera />, text: "List lost item with picture and details" },
  { icon: <FaEdit />, text: "Track from dashboard" },
  { icon: <FaCheckCircle />, text: "Mark as found once recovered" },
];

const checkpointsFound = [
  { icon: <FaSearch />, text: "Browse lost items" },
  { icon: <FaUserCircle />, text: "Create an account or login" },
  { icon: <FaCamera />, text: "List found item with picture and details" },
  { icon: <FaEdit />, text: "Track from dashboard" },
  { icon: <FaCheckCircle />, text: "Mark as returned once claimed" },
];

const HowItWorks = () => {
  return (
    <div className="bg-light py-20 px-6 md:px-16 lg:px-24 xl:px-32">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-16">
        
        {/* Left Section - Lost an Item */}
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-xl font-medium text-gray-700">If you lost something</h3>
          <ul className="space-y-4">
            {checkpointsLost.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600 text-base">
                <span className="text-indigo-600 text-lg">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-64 w-[2px] rounded-full bg-gray-300"></div>

        {/* Right Section - Found an Item */}
        <div className="w-full md:w-1/2 space-y-6">
          <h3 className="text-xl font-medium text-gray-700">If you found something</h3>
          <ul className="space-y-4">
            {checkpointsFound.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600 text-base">
                <span className="text-green-600 text-lg">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
