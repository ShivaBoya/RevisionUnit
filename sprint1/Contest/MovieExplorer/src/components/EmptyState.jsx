import React from "react";
import { FaFilm } from "react-icons/fa";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center mt-10 p-6 bg-gray-800 rounded-xl shadow-md text-center text-gray-300 animate-fadeIn">
      <FaFilm className="text-6xl text-gray-500 mb-4 animate-bounce" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
