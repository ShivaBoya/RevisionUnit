import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = [
  {
    title: "Resources",
    links: ["API Docs", "About TMDB", "Support", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms of Use", "Privacy Policy", "Disclaimer", "Cookies Policy"],
  },
  {
    title: "Community",
    links: ["Forums", "Blog", "Events", "Guidelines"],
  },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaYoutube />, href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-gray-200 mt-12">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-3 md:w-1/4">
          <h2 className="text-white font-bold text-2xl">Movie Explorer</h2>
          <p className="text-sm md:text-base">
            Explore trending, top-rated, and upcoming movies in real-time. Powered by TMDB API.
          </p>

          <div className="flex gap-4 mt-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="hover:text-yellow-400 transition-colors text-xl"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 md:w-3/4">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h3 className="text-white font-semibold">{section.title}</h3>
              {section.links.map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-yellow-400 transition-colors text-sm md:text-base"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-purple-700 w-full">
        <p className="text-center text-sm py-4 text-gray-300">
          &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
