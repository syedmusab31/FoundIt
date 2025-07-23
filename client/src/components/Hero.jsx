import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-70px)] bg-light py-12 px-6 md:px-16 lg:px-24 xl:px-32">
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
      <div className="relative w-full md:w-1/2 flex justify-center items-center h-[400px] md:h-[500px] z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%]">
          {/* Main Image - Slightly offset */}
          <img
            src={assets.hero_image2}
            alt="Person sitting sadly looking for something"
            className="absolute top-0 left-0 w-[70%] h-[70%] object-cover rounded-xl shadow-2xl z-20 transform -rotate-0 hover:rotate-0 transition-transform duration-500"
          />
          {/* Second Image - Below and slightly to the side */}
          <img
            src={assets.hero_image3}
            alt="Lost items scattered"
            className="absolute bottom-0 right-0 w-[70%] h-[70%] object-cover rounded-xl shadow-2xl z-10 transform rotate-0 hover:rotate-0 transition-transform duration-500"
          />
          {/* Third Image - Smaller, above or next to main image */}
          <img
            src={assets.hero_image1}
            alt="Happy reunion of person with lost item"
            className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] object-cover rounded-xl shadow-md z-30 rotate-0 transition-shadow duration-300 hover:shadow-lg"
          />
        </div>
      </div>

      {/* Background blobs/shapes (optional, for visual flair) */}
    </div>
  );
};

export default Hero;
