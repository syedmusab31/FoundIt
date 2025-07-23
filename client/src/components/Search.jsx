import React from "react";
import { FaSearch, FaTimesCircle } from "react-icons/fa"; // Import FaTimesCircle for the clear icon

// Assuming these are defined in your assets.js or a similar file
// Example Categories and Provinces
const categories = [
  "All",
  "Electronics",
  "Clothing & Accessories",
  "Documents",
  "Keys",
  "Bags",
  "Jewelry",
  "Sports Equipment",
  "Pets",
  "Books & Stationery",
  "Medical Items",
  "Other",
];

const provinces = [
  "All",
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Kashmir",
  "Islamabad Capital Territory",
];

const Search = ({ search, setSearch, onClearFilters }) => {
  return (
    <div className="bg-white rounded-full shadow-lg p-4 mb-6 flex items-center justify-between space-x-4">
      {/* Search Bar with Icon */}
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search items..."
          value={search.query}
          onChange={(e) => setSearch({ ...search, query: e.target.value })}
          className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 text-gray-700 placeholder-gray-400"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Select Province */}
      <div className="flex-shrink-0">
        <select
          value={search.province}
          onChange={(e) => setSearch({ ...search, province: e.target.value })}
          className="p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 appearance-none bg-white pr-8"
        >
          {provinces.map((province) => (
            <option key={province} value={province === "All" ? "" : province}>
              {province === "All" ? "All Provinces" : province}
            </option>
          ))}
        </select>
      </div>

      {/* Select Category */}
      <div className="flex-shrink-0">
        <select
          value={search.category}
          onChange={(e) => setSearch({ ...search, category: e.target.value })}
          className="p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 appearance-none bg-white pr-8"
        >
          {categories.map((category) => (
            <option key={category} value={category === "All" ? "" : category}>
              {category === "All" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>

      {/* Select Date */}
      <div className="flex-shrink-0">
        <input
          type="date"
          value={search.date}
          onChange={(e) => setSearch({ ...search, date: e.target.value })}
          className="p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 appearance-none bg-white"
        />
      </div>

      {/* Clear Filters Option */}
      <button
        onClick={onClearFilters}
        className="flex-shrink-0 text-gray-500 hover:text-red-500 text-sm font-medium underline transition-colors duration-200 flex items-center gap-1"
      >
        <FaTimesCircle className="text-base" /> Clear Filters
      </button>
    </div>
  );
};

export default Search;