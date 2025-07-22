// client/src/components/CategoryCard.jsx
import React from "react";
import { Link } from "react-router-dom";
// Assuming categories are passed as props, otherwise import them from a data file
const CategoryCard = ({ categories }) => {
  return (
    <div
      className="
      w-full max-w-[180px] h-36          
      bg-primary                         
      p-4                               
      flex flex-col                       
      items-center                    
      justify-center                     
      text-center                       
      text-white                        
      font-semibold                      
      text-lg     
      rounded-md
      shadow-md                        
      transition-all duration-300         
      hover:bg-primary-dull              
      cursor-pointer                     
    "
    >
      {/* Centered Text */}
      <p className="leading-tight">{categories.name || "Category"}</p>
    </div>
  );
};

export default CategoryCard;
