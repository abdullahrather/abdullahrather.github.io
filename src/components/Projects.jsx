import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Document Management System",
      description: "Comprehensive system with file uploading, categorizing, versioning, and DATEV integration for German accounting standards.",
      image: "https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=DMS",
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "DATEV API"],
      category: "web",
      features: ["File Versioning", "DATEV Integration", "ZUGFeRD XML", "Multi-language Support"],
      github: "https://github.com/abdullahrather",
      demo: "#"
    },
    {
      id: 2,
      title: "Education Management System",
      description: "Complete EMIS with parent portal, student progress tracking, and administrative features built with PHP and JavaScript.",
      image: "https://via.placeholder.com/400x250/059669/FFFFFF?text=EMIS",
      technologies: ["PHP", "PHPMaker", "JavaScript", "jQuery", "MySQL"],
      category: "web",
      features: ["Parent Portal", "Progress Tracking", "Document Submission", "Admin Dashboard"],
      github: "https://github.com/abdullahrather",
      demo: "#"
    },
    {
      id: 3,
      title: "Donor Management System",
      description: "Modern donor management platform with Laravel backend and React frontend for streamlined contribution tracking.",
      image: "https://via.placeholder.com/400x250/DC2626/FFFFFF?text=DMS",
      technologies: ["Laravel", "React", "MySQL", "JavaScript"],
      category: "fullstack",
      features: ["Donor Portal", "Contribution Tracking", "Analytics Dashboard", "Payment Integration"],
      github: "https://github.com/abdullahrather",
      demo: "#"
    },
    {
      id: 4,
      title: "Currency Converter App",
      description: "Real-time currency conversion application with live exchange rates using Laravel and ExchangeRate API.",
      image: "https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Currency",
      technologies: ["Laravel", "GuzzleHttp", "ExchangeRate API", "PHP 8.2+"],
      category: "web",
      features: ["Real-time Rates", "Currency Switch", "Error Handling", "Responsive Design"],
      github: "https://github.com/abdullahrather",
      demo: "#"
    },
    {
      id: 5,
      title: "Ticket Management System",
      description: "Sophisticated workflow system with notifications, advanced routing, and comprehensive reporting features.",
      image: "https://via.placeholder.com/400x250/EA580C/FFFFFF?text=Tickets",
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "AJAX"],
      category: "web",
      features: ["Workflow Management", "Notifications", "Reporting", "User Roles"],
      github: "https://github.com/abdullahrather",
      demo: "#"
    },
    {
      id: 6,
      title: "Employee Performance Tracker",
      description: "Advanced performance tracking system with metrics, reporting, and data visualization tools.",
      image: "https://via.placeholder.com/400x250/0891B2/FFFFFF?text=Performance",
      technologies: ["PHP", "Laravel", "Chart.js", "MySQL", "CSS"],
      category: "web",
      features: ["Performance Metrics", "Data Visualization", "CSV/PDF Export", "Employee Analytics"],
      github: "https://github.com/abdullahrather",
      demo: "#"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Apps' },
    { id: 'fullstack', name: 'Full-Stack' }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of the projects I've worked on, showcasing my expertise in full-stack development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-md">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${filter === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Demo
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;