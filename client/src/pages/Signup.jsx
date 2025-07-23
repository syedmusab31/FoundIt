import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{11}$/.test(form.phone)) newErrors.phone = 'Phone must be 11 digits';
    return newErrors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    // Submit logic here
    alert('Signup successful!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-2 sm:px-4">
      <form
        className="w-full max-w-md sm:max-w-lg md:max-w-xl text-center border border-gray-300/60 rounded-2xl px-4 sm:px-8 bg-white shadow-lg"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="text-gray-900 text-2xl sm:text-3xl mt-8 sm:mt-10 font-medium">Sign Up</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">Create your account</p>

        <div className="mt-8 sm:mt-10">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-xs sm:text-sm w-full h-11 sm:h-12 border border-gray-300/80 rounded-full pl-4 sm:pl-6 mb-2"
            required
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-red-500 text-xs text-left mb-2">{errors.name}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-xs sm:text-sm w-full h-11 sm:h-12 border border-gray-300/80 rounded-full pl-4 sm:pl-6 mb-2"
            required
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-red-500 text-xs text-left mb-2">{errors.email}</div>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-xs sm:text-sm w-full h-11 sm:h-12 border border-gray-300/80 rounded-full pl-4 sm:pl-6 mb-2"
            required
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-red-500 text-xs text-left mb-2">{errors.password}</div>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-xs sm:text-sm w-full h-11 sm:h-12 border border-gray-300/80 rounded-full pl-4 sm:pl-6 mb-2"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="text-red-500 text-xs text-left mb-2">{errors.confirmPassword}</div>}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-xs sm:text-sm w-full h-11 sm:h-12 border border-gray-300/80 rounded-full pl-4 sm:pl-6 mb-2"
            required
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-red-500 text-xs text-left mb-2">{errors.phone}</div>}
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-10 sm:h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity"
        >
          Sign Up
        </button>
        <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3 mb-8 sm:mb-11">
          Already have an account? <a className="text-indigo-500" href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
