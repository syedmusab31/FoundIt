import React, { useState, useEffect, useRef } from "react";
import { Plus, Search, Bell,User, TrendingUp, Package, CheckCircle, Clock, Eye } from "lucide-react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

// Mock data to replace tempItems
const tempItems = [
  {
    id: 1,
    title: "Lost iPhone 14 Pro",
    status: "active",
    location: "Central Park",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    views: 24,
    category: "Electronics"
  },
  {
    id: 2,
    title: "Blue Wallet",
    status: "active",
    location: "Coffee Shop",
    date: "2024-01-14",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
    views: 12,
    category: "Personal"
  },
  {
    id: 3,
    title: "Gold Watch",
    status: "resolved",
    location: "Mall",
    date: "2024-01-13",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop",
    views: 45,
    category: "Jewelry"
  },
  {
    id: 4,
    title: "Black Backpack",
    status: "active",
    location: "University",
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
    views: 18,
    category: "Bags"
  }
];

// Modern UserItemCard component
const UserItemCard = ({ item }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close the menu when clicking outside
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  // Add event listener for clicks outside the menu
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="min-w-72 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 mr-4"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === "active"
                ? "bg-amber-100 text-amber-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {item.status === "active" ? "Lost" : "Found"}
          </span>
        </div>
        {/* Three-dot menu for updating item status */}
        <div className="absolute top-3 left-3" ref={menuRef}>
          <button
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  navigate(`/items/${item.id}/mark-as-found`);
                  setMenuOpen(false);
                }}
              >
                Mark as Found
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  navigate(`/items/${item.id}/edit`);
                  setMenuOpen(false);
                }}
              >
                Edit Item
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                onClick={() => {
                  navigate(`/items/${item.id}/delete`);
                  setMenuOpen(false);
                }}
              >
                Delete Item
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.location}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{item.date}</span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

// Stats Card component
// const StatsCard = ({ icon: Icon, title, value, change, color }) => (
//   <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-sm font-medium text-gray-600">{title}</p>
//         <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
//         {change && (
//           <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
//             {change} from last week
//           </p>
//         )}
//       </div>
//       <div className={`p-3 rounded-xl ${color}`}>
//         <Icon size={24} className="text-white" />
//       </div>
//     </div>
//   </div>
// );

// Quick Action Button
const QuickActionButton = ({ icon: Icon, label, onClick, primary = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
      primary
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
        : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const Title = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="relative px-6 py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-5"></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {getGreeting()}!
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Here's what's happening with your items today
            </p>
          </div>
          {/* <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" size={24} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const activeItems = tempItems.filter((item) => item.status === "active");
  const foundItems = tempItems.filter((item) => item.status === "resolved");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <Title />

        {/* Search and Quick Actions */}
        <section className="mt-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search your items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Navigate to "Report Lost Item" page */}
              <QuickActionButton
                icon={Plus}
                label="Report Lost Item"
                onClick={() => navigate("/lost/new")} // Navigate to /lost/new
                primary={true}
              />
              {/* Navigate to "Report Found Item" page */}
              <QuickActionButton
                icon={CheckCircle}
                label="Report Found Item"
                onClick={() => navigate("/found/new")} // Navigate to /found/new
              />
            </div>
          </div>
        </section>

        {/* Listed Items */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your Active Listings
              </h2>
              <p className="text-gray-600 mt-1">
                Items you're currently looking for
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp size={16} />
              <span>{activeItems.length} active</span>
            </div>
          </div>

          {activeItems.length > 0 ? (
            <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {activeItems.map((item) => (
                <UserItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <Package className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No active listings
              </h3>
              <p className="text-gray-600 mb-6">
                Start by reporting a lost item
              </p>
              <QuickActionButton
                icon={Plus}
                label="Report Lost Item"
                onClick={() => navigate("/lost/new")}
                primary={true}
              />
            </div>
          )}
        </section>

        {/* Found Items */}
        <section className="mt-12 mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recently Resolved
              </h2>
              <p className="text-gray-600 mt-1">
                Items that have been successfully reunited
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <CheckCircle size={16} />
              <span>{foundItems.length} resolved</span>
            </div>
          </div>

          {foundItems.length > 0 ? (
            <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {foundItems.map((item) => (
                <UserItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <CheckCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No resolved items yet
              </h3>
              <p className="text-gray-600">
                Your successful reunions will appear here
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;