import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Abdullah Rather</div>
          <ul className="flex space-x-6">
            <li><ScrollLink to="hero" smooth duration={500} className="cursor-pointer hover:text-blue-600">Home</ScrollLink></li>
            <li><ScrollLink to="about" smooth duration={500} className="cursor-pointer hover:text-blue-600">About</ScrollLink></li>
            <li><ScrollLink to="services" smooth duration={500} className="cursor-pointer hover:text-blue-600">Services</ScrollLink></li>
            <li><ScrollLink to="projects" smooth duration={500} className="cursor-pointer hover:text-blue-600">Projects</ScrollLink></li>
            <li><ScrollLink to="contact" smooth duration={500} className="cursor-pointer hover:text-blue-600">Contact</ScrollLink></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow pt-24">{children}</main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="container mx-auto text-center text-sm">
          © {new Date().getFullYear()} Abdullah Rather. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;