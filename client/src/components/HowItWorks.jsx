import React from "react";
import { FaSearch, FaCamera, FaUserCircle, FaEdit, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const workflows = [
    {
      title: "Lost an Item?",
      steps: [
        { icon: <FaSearch className="text-indigo-500" />, text: "Browse found items" },
        { icon: <FaUserCircle className="text-indigo-500" />, text: "Create an account or login" },
        { icon: <FaCamera className="text-indigo-500" />, text: "List lost item with details" },
        { icon: <FaEdit className="text-indigo-500" />, text: "Track from dashboard" },
        { icon: <FaCheckCircle className="text-indigo-500" />, text: "Mark as found once recovered" }
      ],
      color: "indigo"
    },
    {
      title: "Found an Item?",
      steps: [
        { icon: <FaSearch className="text-green-500" />, text: "Browse lost items" },
        { icon: <FaUserCircle className="text-green-500" />, text: "Create an account or login" },
        { icon: <FaCamera className="text-green-500" />, text: "List found item with details" },
        { icon: <FaEdit className="text-green-500" />, text: "Track from dashboard" },
        { icon: <FaCheckCircle className="text-green-500" />, text: "Mark as returned once claimed" }
      ],
      color: "green"
    }
  ];

  return (
    <section className="bg-light py-20 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          How FoundIt Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {workflows.map((workflow, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl bg-gradient-to-br from-${workflow.color}-50 to-white border border-${workflow.color}-100`}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {workflow.title}
              </h3>

              <ul className="space-y-5">
                {workflow.steps.map((step, i) => (
                  <li key={i} className="flex items-center gap-4"> {/* Aligned vertically */}
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full bg-${workflow.color}-100`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">{step.text}</p>
                      {i < workflow.steps.length - 1 && (
                        <div
                          className={`h-6 w-px ml-5 my-1 bg-${workflow.color}-200`}
                        ></div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;