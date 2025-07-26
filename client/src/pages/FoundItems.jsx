import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import { FoundItem, User } from '../assets/assets';
import Title from '../components/Title';
import ReactPaginate from 'react-paginate';
import ItemCard from '../components/ItemCard';
import Footer from '../components/Footer';

const categories = [
  "All", "Electronics", "Personal Belongings", "Documents", "Keys", "Bags",
  "Jewelry", "Toys", "Pets", "Books", "Eyewear", "Accessories",
];

const provinces = [
  "All", "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan",
  "Gilgit-Baltistan", "Azad Kashmir", "Islamabad Capital Territory",
];

const FoundItems = () => {
  const [search, setSearch] = useState({
    query: "",
    province: "",
    category: "",
    date: "",
  });

  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch found items from backend
    fetch('http://localhost:5000/api/items/found')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAllItems(data.data || []);
        } else {
          setAllItems([]);
        }
      })
      .catch(() => setAllItems([]));
  }, []);

  useEffect(() => {
    const filtered = allItems.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(search.query.toLowerCase()) ||
        item.description.toLowerCase().includes(search.query.toLowerCase());
      const matchesProvince = !search.province || item.province === search.province;
      const matchesCategory = !search.category || item.category === search.category;
      const matchesDate = !search.date || new Date(item.createdAt).toISOString().split('T')[0] === search.date;
      return matchesQuery && matchesProvince && matchesCategory && matchesDate;
    });
    setFilteredItems(filtered);
    setCurrentPage(0);
  }, [search, allItems]);

  const handleClearFilters = () => {
    setSearch({
      query: "",
      province: "",
      category: "",
      date: "",
    });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(0, (currentPage + 1) * itemsPerPage);
  return (
    <div className="min-h-screen flex flex-col bg-light" >
      <header className="py-8 px-4 md:px-0 flex flex-col items-center">
        <Title
          title="Found Items"
          subtitle="Filter by Categories, Locations or Search the Item"
     
        />
      </header>

      {/* Filter Bar */}
      <section className="px-2 md:px-0 flex justify-center">
        <div
          className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-4 md:p-6 w-full max-w-4xl border border-white/30 transition-all"
         
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-center">
            {/* Search Bar */}
            <div className="relative col-span-2">
              <input
                type="text"
                placeholder="Search items..."
                value={search.query}
                onChange={(e) => setSearch({ ...search, query: e.target.value })}
                className="w-full pl-4 pr-10 py-2 bg-white/60 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 placeholder-gray-400 shadow-sm transition"
              
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Province */}
            <div>
              <select
                value={search.province}
                onChange={(e) => setSearch({ ...search, province: e.target.value })}
                className="w-full p-2 bg-white/60 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 pr-1 shadow-sm transition"
                
              >
                {provinces.map((province) => (
                  <option key={province} value={province === "All" ? "" : province}>
                    {province === "All" ? "All Provinces" : province}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <select
                value={search.category}
                onChange={(e) => setSearch({ ...search, category: e.target.value })}
                className="w-full p-2 bg-white/60 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 pr-1 shadow-sm transition"
             
              >
                {categories.map((category) => (
                  <option key={category} value={category === "All" ? "" : category}>
                    {category === "All" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <input
                type="date"
                value={search.date}
                onChange={(e) => setSearch({ ...search, date: e.target.value })}
                className="w-full p-2 bg-white/60 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-sm transition"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end">
              <button
                onClick={handleClearFilters}
                className="flex-shrink-0 pr-10 text-gray-500 hover:text-red-500 text-sm font-medium underline transition-colors flex items-center gap-1"
              >
                <FaTimesCircle className="text-base" /> Clear
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Display */}
      <main className="flex-grow w-full flex flex-col items-center">
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-5 py-6 max-w-7xl w-full">
            {currentItems.map((item, idx) => (
              <ItemCard key={item._id || idx} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-black text-center py-10 flex-grow">No found items found.</p>
        )}

        {/* Pagination */}
        {/* Load More Button */}
        {filteredItems.length > (currentPage + 1) * itemsPerPage && (
          <button
            className="mt-8 mb-6 px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Load More
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FoundItems;