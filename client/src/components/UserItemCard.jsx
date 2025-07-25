import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";

const UserItemCard = ({ item }) => {
  const [status, setStatus] = useState(item.status);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/item/${item._id}`);
      alert("Item deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = status === "active" ? "resolved" : "active";
      await axios.patch(`/api/item/${item._id}/status`, { status: newStatus });
      setStatus(newStatus);
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleUpdate = () => {
    alert("Redirect to update form...");
  };

  return (
    <div className="relative min-w-[280px] max-w-sm bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-xl overflow-hidden mr-4">
      <img
        src={item.image || "/placeholder.jpg"}
        alt={item.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.location} • {item.date}</p>
        <span className={`text-xs font-medium px-2 py-1 mt-2 inline-block rounded-full ${status === "active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
          {status}
        </span>
      </div>

      <Menu as="div" className="absolute top-2 right-2 z-10">
        <Menu.Button className="p-2 rounded-full hover:bg-white/30">
          <EllipsisVertical className="w-5 h-5 text-white" />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-in"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md py-1 z-20">
            <Menu.Item>
              {({ active }) => (
                <button onClick={handleUpdate} className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}>
                  Update Item
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={handleStatusChange} className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}>
                  Mark as {status === "active" ? "Resolved" : "Active"}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={handleDelete} className={`w-full text-left px-4 py-2 text-sm text-red-600 ${active ? "bg-gray-100" : ""}`}>
                  Delete Item
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserItemCard;
