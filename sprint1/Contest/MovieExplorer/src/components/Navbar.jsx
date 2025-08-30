import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ search, setSearch }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Movies", "TV Shows", "People", "Trending"];

  return (
    <nav className="bg-gray-900 text-gray-200 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-2xl cursor-pointer">
          Movie Explorer
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:text-white transition-colors font-medium"
            >
              {link}
            </a>
          ))}

          {/* Search */}
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:text-white transition-colors font-medium"
            >
              {link}
            </a>
          ))}
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 mt-2"
          />
        </div>
      )}
    </nav>
  );
}
