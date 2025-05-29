import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm dark:backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Abdullah Rather</div>
          <ul className="flex space-x-6">
            <li><ScrollLink to="hero" smooth duration={500} className="cursor-pointer hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300 font-medium">Home</ScrollLink></li>
            <li><ScrollLink to="about" smooth duration={500} className="cursor-pointer hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300 font-medium">About</ScrollLink></li>
            <li><ScrollLink to="services" smooth duration={500} className="cursor-pointer hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300 font-medium">Services</ScrollLink></li>
            <li><ScrollLink to="projects" smooth duration={500} className="cursor-pointer hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300 font-medium">Projects</ScrollLink></li>
            <li><ScrollLink to="contact" smooth duration={500} className="cursor-pointer hover:text-blue-600 transition-colors text-gray-700 dark:text-gray-300 font-medium">Contact</ScrollLink></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-300">
              © {new Date().getFullYear()} Abdullah Rather. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Built with React, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;