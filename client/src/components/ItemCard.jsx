import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { User } from "../assets/assets";

const ItemCard = ({ item }) => {
  const matchedUser = User.find((u) => u._id === item.userId);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(item.createdAt));

  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col group">
      {/* Status Badge */}
      <span className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-wide capitalize shadow
        ${item.status === "active" ? "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white" : "bg-gray-300 text-gray-700"}
      `}>
        {item.status}
      </span>

      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={item.image || "https://via.placeholder.com/400x300"}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-grow">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-900 truncate">{item.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500">
          <div>
            <span className="font-semibold text-gray-700">Category:</span>
            <span className="ml-1">{item.category}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="ml-1">{item.location?.province}</span>
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-gray-700">Posted:</span>
            <span className="ml-1">{formattedDate}</span>
          </div>
        </div>

        {/* User Info + CTA */}
        {matchedUser && (
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className=" w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-base">
                {matchedUser.name[0]}
              </span>
              <div>
                <div className="text-sm font-medium text-gray-800">{matchedUser.name}</div>
                <div className="text-xs text-gray-500">{matchedUser.email}</div>
              </div>
            </div>
            <a
              href={`https://wa.me/${item.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-5 py-2 rounded-lg shadow transition"
            >
              <FaWhatsapp className="text-lg" />
              Contact
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
