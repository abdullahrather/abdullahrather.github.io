import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 text-white"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm Abdullah Rather.
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Full-Stack Developer & Freelancer
      </motion.p>
      <motion.a
        href="#projects"
        className="px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View My Work
      </motion.a>
    </section>
  );
};

export default Hero;