import React from "react";
import { categories } from "../assets/assets";
import CategoryCard from "./CategoryCard";
import Title from "./Title";

const CategorySection = () => {
  return (
    <div className="flex flex-col mt-1 bg-light items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Title
          title="Browse by Categories"
          subtitle="Find all lost items listed according to category"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-18">
        {categories.slice(0, 10).map((categories, index) => (
          <div key={index}>
            <CategoryCard categories={categories} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
    </div>
  );
};

export default CategorySection;
