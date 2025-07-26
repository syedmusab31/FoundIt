import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../assets/assets';
import { provinces } from '../assets/assets';

const ListLostItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    phone: '',  // Changed from phoneNumber to match backend
    province: '',
    image: null
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const [myLostItems, setMyLostItems] = useState([]);

  useEffect(() => {
    // Get JWT token from cookies
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    fetch('http://localhost:5000/api/items/my/active', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMyLostItems((data.data || []).filter(item => item.type === 'lost'));
        } else {
          setMyLostItems([]);
        }
      })
      .catch(() => setMyLostItems([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate all fields
    if (!formData.title || !formData.description || !formData.category || 
        !formData.phone || !formData.province || !formData.image) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get JWT token from cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      console.log('Token:', token); // Debugging line

      if (!token) {
        navigate('/login', { 
          state: { 
            from: '/lost/new',
            message: 'Please login to list a lost item' 
          } 
        });
        return;
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('province', formData.province);
      formDataToSend.append('image', formData.image);

      console.log('Sending request with token:', token);

      const response = await fetch('http://localhost:5000/api/items/lost/new', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create item');
      }

      const data = await response.json();

      // On success, refresh user's lost items
      fetchMyLostItems();
      navigate('/dashboard', {
        state: {
          message: 'Lost item listed successfully!',
          item: data.data 
        } 
      });
    } catch (err) {
      setError(err.message || 'Failed to list item. Please try again.');
      console.error('Error creating lost item:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add fetchMyLostItems function to refresh user's lost items
  const fetchMyLostItems = () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    fetch('http://localhost:5000/api/items/my/active', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMyLostItems((data.data || []).filter(item => item.type === 'lost'));
        } else {
          setMyLostItems([]);
        }
      })
      .catch(() => setMyLostItems([]));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List a Lost Item</h1>
          <p className="mt-2 text-gray-600">Help us reunite lost items with their owners</p>
        </div>
        {/* My Listed Lost Items */}
        {myLostItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">My Listed Lost Items</h2>
            <ul className="space-y-4">
              {myLostItems.map(item => (
                <li key={item._id} className="p-4 bg-white rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.description}</div>
                  </div>
                  <div className="text-gray-500 text-xs mt-2 md:mt-0">{item.status}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 sm:p-8">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
            <div className="mt-1 flex items-center">
              <div className="relative rounded-md overflow-hidden w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-4">
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Upload Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="sr-only" 
                    onChange={handleImageChange}
                    required
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">JPEG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Item Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g. Black Wallet, iPhone 12, etc."
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Provide detailed description including any identifying marks, contents, etc."
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g. 0712345678"
              required
            />
          </div>

          {/* Province Dropdown */}
          <div className="mb-6">
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
              Province
            </label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select your province</option>
              {provinces.map((province, index) => (
                <option key={index} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Listing Item...' : 'List Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListLostItem;