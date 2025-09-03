import React from "react";
import { FaTasks, FaCheckCircle, FaClock, FaUser } from "react-icons/fa";

const items = [
  { name: "All Tasks", icon: <FaTasks /> },
  { name: "Completed Tasks", icon: <FaCheckCircle /> },
  { name: "Pending Tasks", icon: <FaClock /> },
  { name: "Profile", icon: <FaUser /> },
];

export default function Sidebar({ selected, onSelect }) {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">TaskDash</h2>
        <p className="text-sm text-gray-500">Organize your day.</p>
      </div>

      <nav>
        {items.map((it) => (
          <button
            key={it.name}
            onClick={() => onSelect(it.name)}
            className={`w-full flex items-center gap-3 p-3 rounded-md mb-2 text-left hover:bg-gray-50 transition
${selected === it.name ? "bg-indigo-50 border-l-4 border-indigo-500" : ""}`}
          >
            <span className="text-indigo-600">{it.icon}</span>
            <span>{it.name}</span>
          </button>
        ))}
      </nav>

      
    </aside>
  );
}
