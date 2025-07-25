import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-[90vh] bg-white py-12 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">
      {/* Left Content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl md:w-1/2 mb-10 md:mb-0 z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Getting lost isn't the end —{" "}
          <span className="text-primary">finding is just the beginning</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
          Our platform makes reuniting lost items with their owners quick, easy, 
          and reliable. Whether you've lost something or found an item, we're here to help.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/lost"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dull text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-md"
          >
            <img src={assets.search_iconn} alt="Search" className="h-4 w-4" />
            Search Lost Items
          </Link>
          
          <Link
            to="/found"
            className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-md"
          >
            Browse Found Items
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-[500px] mb-10 md:mb-0">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Main Image with layered effect */}
          <div className="relative w-full h-full max-w-md">
            <img
              src={assets.hero_image2}
              alt="Person looking for lost item"
              className="absolute z-20 w-3/4 left-0 top-0 rounded-xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-500"
            />
           <img
              src={assets.hero_image3}
              alt="Lost items"
              className="absolute z-10 w-3/4 right-0 bottom-0 rounded-xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute z-30 -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl z-0"></div>
    </div>
  );
};

export default Hero;