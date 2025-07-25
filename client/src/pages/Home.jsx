import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Search,
  ArrowRight,
  CheckCircle,
  User,
  Camera,
  Edit3,
} from "lucide-react";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Electronics", icon: "📱", count: "245" },
    { name: "Keys", icon: "🔑", count: "189" },
    { name: "Jewelry", icon: "💍", count: "156" },
    { name: "Documents", icon: "📄", count: "203" },
    { name: "Bags", icon: "🎒", count: "178" },
    { name: "Clothing", icon: "👕", count: "134" },
    { name: "Wallets", icon: "👛", count: "167" },
    { name: "Books", icon: "📚", count: "112" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      text: "FoundIt helped me recover my lost laptop within 48 hours. The process was seamless and professional.",
    },
    {
      name: "Michael Rodriguez",
      role: "Software Engineer",
      text: "I found someone's wallet and returned it through FoundIt. The platform made the entire process effortless.",
    },
    {
      name: "Emma Thompson",
      role: "Marketing Director",
      text: "Lost my engagement ring during travel. FoundIt connected me with the person who found it. Forever grateful.",
    },
  ];

  const stats = [
    { number: "15,000+", label: "Items Reunited" },
    { number: "8,500+", label: "Active Users" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Cities" },
  ];

  const handleCategoryClick = (category) => {
    // Navigate to the Lost Items page with the selected category as a query parameter
    navigate(`/lost-items?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                1,234 active searches today
              </div>

              <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900">
                Getting lost isn't the end —{" "}
                <span className="font-medium text-blue-600">
                  finding is just the beginning
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Our platform makes reuniting lost items with their owners quick,
                easy, and reliable. Join thousands who trust FoundIt.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200">
                  <Search className="w-5 h-5" />
                  Search Lost Items
                </button>

                <button className="flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-8 py-4 rounded-lg transition-colors duration-200">
                  Browse Found Items
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
                <div className="relative">
                  {/* Main Phone Mockup */}
                  <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                    <div className="bg-white rounded-2xl h-full p-4 flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Search className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">
                          FoundIt
                        </span>
                      </div>

                      <div className="space-y-4 flex-1">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                              📱
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                iPhone 14 Pro
                              </div>
                              <div className="text-xs text-gray-600">
                                Lost near Central Park
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-lg">
                              🔑
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                Car Keys
                              </div>
                              <div className="text-xs text-gray-600">
                                Found at Coffee Shop
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-lg">
                              🎒
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                Blue Backpack
                              </div>
                              <div className="text-xs text-gray-600">
                                Lost at University
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-lg">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Browse by Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find lost items organized by category for faster results
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
                onClick={() => handleCategoryClick(category.name)} // Handle category click
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              How FoundIt Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to reunite with your belongings
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {[
              {
                title: "Lost an Item?",
                steps: [
                  { icon: Search, text: "Browse found items in your area" },
                  { icon: User, text: "Create your account" },
                  { icon: Camera, text: "List your lost item with details" },
                  { icon: Edit3, text: "Track progress from dashboard" },
                  { icon: CheckCircle, text: "Get notified when found" },
                ],
              },
              {
                title: "Found an Item?",
                steps: [
                  { icon: Search, text: "Search for similar lost items" },
                  { icon: User, text: "Sign up in seconds" },
                  { icon: Camera, text: "Upload item details and photos" },
                  { icon: Edit3, text: "Manage from your dashboard" },
                  { icon: CheckCircle, text: "Connect with the owner" },
                ],
              },
            ].map((workflow, workflowIndex) => (
              <div key={workflowIndex} className="space-y-8">
                <h3 className="text-xl font-medium text-gray-900 mb-8">
                  {workflow.title}
                </h3>
                <div className="space-y-6">
                  {workflow.steps.map((step, stepIndex) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={stepIndex} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="pt-2">
                          <p className="text-gray-700 leading-relaxed">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl lg:text-4xl font-light leading-tight">
                Found an Item?
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Reconnect it with its owner effortlessly through FoundIt
              </p>
              <p className="text-blue-100 max-w-lg leading-relaxed">
                Our secure platform makes returning lost items simple and
                stress-free for everyone involved.
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                List Found Item
              </button>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="w-80 h-64 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🤝</div>
                  <p className="text-white font-medium">Make Someone's Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-200">
            <div className="text-center">
              <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed font-light">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="space-y-2">
                <div className="font-medium text-gray-900">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600 text-sm">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentTestimonial
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="text-2xl font-semibold text-gray-900">
                FoundIt
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Reuniting lost items with their owners through technology and
                community.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Product</h3>
              <div className="space-y-3">
                {[
                  "Search Items",
                  "List Item",
                  "How it Works",
                  "Success Stories",
                ].map((link, i) => (
                  <div
                    key={i}
                    className="text-gray-600 hover:text-gray-900 cursor-pointer text-sm transition-colors"
                  >
                    {link}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Support</h3>
              <div className="space-y-3">
                {["Help Center", "Contact", "Privacy", "Terms"].map(
                  (link, i) => (
                    <div
                      key={i}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer text-sm transition-colors"
                    >
                      {link}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2025 FoundIt. All rights reserved.
              </p>
              <p className="text-gray-600 text-sm">
                Developed by Syed Musab Bukhari
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div>
      {/* Example usage */}
      <button onClick={() => navigate("/lost/new")}>Report Lost Item</button>
    </div>
  );
};

export default Home;
