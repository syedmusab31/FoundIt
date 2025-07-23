import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-2 sm:px-4">
      <div className="bg-white text-gray-500 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto p-4 sm:p-8 text-left text-sm rounded-2xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
          Forgot Password?
        </h2>
        <label htmlFor="email" className="block mb-1 text-gray-700">
          Email
        </label>
        <input
          id="email"
          className="w-full border mt-1 border-gray-300 focus:border-indigo-500 outline-none rounded-full py-2.5 px-4 text-gray-700 placeholder-gray-400 transition"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="button"
          className="w-full my-4 bg-primary hover:opacity-90 active:scale-95 transition py-2.5 rounded-full text-white font-medium"
        >
          Send Email
        </button>
        <p className="text-center mt-4 text-xs sm:text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
