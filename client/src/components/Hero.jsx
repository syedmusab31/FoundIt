import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-70px)] bg-light py-12 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">
      {/* Left Section: Title, Subtitle, Buttons */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl md:w-1/2 mb-10 md:mb-0 z-10">
        <h1 className="text-5xl md:text-6xl font-semibold text-gray-800 mb-6 leading-tight tracking-tight">
          Getting lost isn't the{" "}
          <span className="text-indigo-600">end-finding</span> is just the
          beginning!
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-500 mb-8 leading-relaxed">
          Lost something? Found something? Let's reconnect them! Our Digital
          Lost & Found System is your go-to-place for reuniting
          belongings—quick, easy, and reliable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/lost" // Link to browse lost items
            className="bg-primary hover:bg-primary-dull text-light font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            <img
              src={assets.search_iconn}
              alt="Search Icon"
              className="h-4 w-4 inline-block mr-2 "
            />
            Search Lost Items
          </Link>
          <Link
            to="/found" // Link to a "found" page (you'll need to create this route)
            className="bg-white text-gray-700 border border-border-color hover:bg-gray-50 font-bold py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Browse Found Items
            <svg
              className="w-4 h-4 ml-2 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Right Section: Stacked Images */}
        <div aria-label="Photos of leaders" class="mt-12 grid grid-cols-2 gap-6 pb-6">
            <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg" height="140"
                src="https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?q=80&w=735&auto=format&fit=crop"
                width="120" />
            <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg" height="140"
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop"
                width="120" />
            <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg" height="140"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop"
                width="120" />
            <img alt="" class="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg" height="140"
                src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop"
                width="120" />
        </div>

      {/* Background blobs/shapes (optional, for visual flair) */}
    </div>
  );
};

export default Hero;
