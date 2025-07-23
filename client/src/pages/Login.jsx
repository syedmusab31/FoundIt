import { AiOutlineMail } from 'react-icons/ai';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { BiSolidLock } from 'react-icons/bi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-light px-2 sm:px-4">
      <form className="w-full max-w-md sm:max-w-lg md:max-w-xl text-center border border-gray-300/60 rounded-2xl px-4 sm:px-8 bg-white shadow-lg">
        <h1 className="text-gray-900 text-2xl sm:text-3xl mt-8 sm:mt-10 font-medium">Login</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">Please sign in to continue</p>
        <div className="flex items-center w-full mt-8 sm:mt-10 bg-white border border-gray-300/80 h-11 sm:h-12 rounded-full overflow-hidden pl-4 sm:pl-6 gap-2">
        <AiOutlineMail className='text-base text-gray-500' />
          <input
            type="email"
            placeholder="Email id"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-xs sm:text-sm w-full h-full"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center mt-3 sm:mt-4 w-full bg-white border border-gray-300/80 h-11 sm:h-12 rounded-full overflow-hidden pl-4 sm:pl-6 gap-2">
         <BiSolidLock className='text-base text-gray-500' />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-xs sm:text-sm w-full h-full"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 sm:mt-5 text-left text-indigo-500">
          <Link className="text-xs sm:text-sm" to="/forgot-password">Forgot password?</Link>
        </div>

        <button type="submit" className="mt-2 w-full h-10 sm:h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity">
          Login
        </button>
        <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3 mb-8 sm:mb-11">
          Don’t have an account? <Link className="text-indigo-500" to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
      </div>
  );
};

export default Login;
