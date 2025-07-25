import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="bg-light">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className=" rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-primary to-primary-dark">
          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 ">
            {/* Text Content */}
            <div className="text-white md:w-1/2 mb-8 md:mb-0 ">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Found an Item?
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Reconnect it with its owner effortlessly through <span className="font-semibold">FoundIt</span>
              </p>
              <p className="text-white/80 mb-6 max-w-lg">
                Our secure platform makes returning lost items simple and stress-free.
              </p>
              <Link 
                to="/found/new" 
                className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                List Found Item
              </Link>
            </div>

            {/* Image */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src={assets.banner_image}
                alt="Found items illustration"
                className="max-h-72 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;