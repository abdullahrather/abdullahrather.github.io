import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Enterprise Management System",
      description:
        "Comprehensive enterprise system with project management, document handling, DATEV integration, and multi-language support using Yii PHP framework.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&crop=center",
      technologies: [
        "Yii Framework",
        "PHP",
        "MySQL",
        "JavaScript",
        "DATEV API",
        "Bootstrap",
      ],
      category: "fullstack",
      features: [
        "Project Management",
        "DATEV Integration",
        "ZUGFeRD XML Generation",
        "Multi-language Support",
      ],
      github: "https://github.com/abdullahrather",
      demo: "#",
    },
    {
      id: 2,
      title: "Education Management System",
      description:
        "Complete education management platform with student management, parent portal, teacher dashboard, and financial modules built with PHP.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop&crop=center",
      technologies: ["PHP", "PHPMaker", "JavaScript", "jQuery", "MySQL"],
      category: "fullstack",
      features: [
        "Student Management",
        "Parent Portal",
        "Teacher Dashboard",
        "Financial Modules",
      ],
      github: "https://github.com/abdullahrather",
      demo: "#",
    },
    {
      id: 3,
      title: "Donor Management System",
      description:
        "Modern donor management platform with Laravel backend and React frontend for streamlined contribution tracking and analytics.",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=500&fit=crop&crop=center",
      technologies: ["Laravel", "React", "MySQL", "JavaScript"],
      category: "fullstack",
      features: [
        "Donor Portal",
        "Contribution Tracking",
        "Analytics Dashboard",
        "Payment Integration",
      ],
      github: "https://github.com/abdullahrather",
      demo: "#",
    },
    {
      id: 4,
      title: "Currency Converter App",
      description:
        "Real-time currency conversion web application with live exchange rates, currency switching, and responsive design using Laravel.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop&crop=center",
      technologies: ["Laravel", "GuzzleHttp", "ExchangeRate API", "PHP 8.2+"],
      category: "web",
      features: [
        "Real-time Exchange Rates",
        "Currency Switch Function",
        "Error Handling",
        "Responsive Design",
      ],
      github: "https://github.com/abdullahrather",
      demo: "#",
    },
    {
      id: 5,
      title: "Ticket Management System",
      description:
        "Sophisticated workflow management system with advanced routing, notifications, user roles, and comprehensive reporting features.",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop&crop=center",
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "AJAX"],
      category: "fullstack",
      features: [
        "Advanced Workflow",
        "Notification System",
        "Role Management",
        "Comprehensive Reporting",
      ],
      github: "https://github.com/abdullahrather",
      demo: "#",
    },
    {
      id: 6,
      title: "Employee Performance Tracker",
      description:
        "Advanced HR management system with performance metrics, data visualization, analytics dashboard, and export capabilities.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop&crop=center",
      technologies: ["PHP", "Laravel", "ApexCharts.js", "MySQL", "CSS"],
      category: "fullstack",
      features: [
        "Performance Analytics",
        "Data Visualization",
        "CSV/PDF Export",
        "Employee Dashboard",
      ],
      github: "https://github.com/abdullahrather",
      demo: "#",
    },
    {
      id: 7,
      title: "Laravel Auth & Role Management App",
      description:
        "Comprehensive Laravel application featuring advanced authentication, authorization, and role-based access control with Gates policies and Eloquent relationships.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&crop=center",
      technologies: [
        "Laravel",
        "PHP",
        "MariaDB",
        "Blade",
        "Bootstrap 5",
        "Eloquent ORM",
      ],
      category: "fullstack",
      features: [
        "User Authentication & Registration",
        "Role-Based Authorization",
        "Gates & Policies Implementation",
        "Role-Specific Views & Permissions",
        "CRUD Operations with Access Control",
        "Eloquent Relationships",
        "Database Seeding for Roles",
      ],
      github: "https://github.com/abdullahrather/AuthnAndAuthz-Laravel",
      demo: "#",
    },
    {
      id: 8,
      title: "Academic Institution Website",
      description:
        "A custom-built academic institution website featuring secure user authentication with CAPTCHA-protected registration and password recovery, role-based dashboard, student performance modules, news/events sections, committee and application form management, developed using PHP and MySQL.",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=500&fit=crop&crop=center",
      technologies: ["PHP", "MySQL", "JavaScript", "CSS", "HTML", "CAPTCHA"],
      category: "web",
      features: [
        "Secure User Registration & Login",
        "Password Reset with CAPTCHA Verification",
        "Role-Based Dashboard",
        "Student Grades & Top Performers",
        "News & Announcements Pages",
        "Event & Committee Management",
        "Application Form Submission",
      ],
      github: "https://github.com/abdullahrather/CustomAcademy-PHP",
      demo: "#",
    },
    {
      id: 9,
      title: "Laravel Authentication & CRUD System",
      description:
        "An authentication system combined with product management CRUD operations built on Laravel 10's MVC framework, including secure user registration and login alongside full product lifecycle handling.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&crop=center",
      technologies: [
        "Laravel 10",
        "PHP",
        "MySQL",
        "Blade",
        "JavaScript",
        "CSS",
      ],
      category: "web",
      features: [
        "User Registration & Login",
        "Product Create/Read/Update/Delete",
        "Form Validation",
        "MVC Routing",
        "Blade Templating",
      ],
      github: "https://github.com/abdullahrather/AuthProductsCrud-Laravel10",
      demo: "#",
    },
    {
      id: 10,
      title: "Corporate Insurance Website",
      description:
        "A custom-built insurance company website with a dynamic form submission module for user inquiries and application processing, supported by SQL schema scripts and styled components.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&crop=center",
      technologies: ["PHP", "JavaScript", "CSS", "MySQL", "Hack"],
      category: "web",
      features: [
        "Dynamic Form Submission",
        "SQL Schema Setup",
        "Custom PHP Pages",
        "Client-Side Validation",
        "Responsive Design",
      ],
      github: "https://github.com/abdullahrather/CustomWebsite-PHP",
      demo: "#",
    },
    {
      id: 11,
      title: "Laravel Authentication Showcase",
      description:
        "A Laravel project showcasing built-in authentication features including registration, login/logout, password reset, and email verification using Laravel's scaffolding and middleware.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop&crop=center",
      technologies: ["Laravel", "PHP", "Blade", "MySQL", "CSS", "JavaScript"],
      category: "web",
      features: [
        "User Registration",
        "Login & Logout",
        "Password Reset",
        "Email Verification",
        "Authentication Middleware",
      ],
      github: "https://github.com/abdullahrather/Auth-Laravel",
      demo: "#",
    },
    {
      id: 12,
      title: "Laravel MVC CRUD Application",
      description:
        "An example Laravel application demonstrating Create, Read, Update, and Delete operations for generic resources, emphasizing MVC conventions and form request validation.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&crop=center",
      technologies: ["Laravel", "PHP", "Blade", "MySQL", "CSS", "JavaScript"],
      category: "web",
      features: [
        "Resourceful Routing",
        "Model-Controller Binding",
        "Form Request Validation",
        "Blade View Rendering",
        "Database Migrations",
      ],
      github: "https://github.com/abdullahrather/CrudOperations-Laravel",
      demo: "#",
    },
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "fullstack", name: "Full-Stack" },
    { id: "web", name: "Web Apps" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Projects title
    gsap.to("#projectsTitle", {
      scrollTrigger: {
        trigger: "#projectsTitle",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
    });

    // Project cards
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
      });
    });
  }, [filteredProjects]);

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="projectsTitle"
            className="text-4xl font-bold mb-4 transform opacity-0 translate-y-6"
          >
            Success Stories
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on, showcasing my
            expertise in full-stack development.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg shadow-md backdrop-blur ring-1 ring-white/20">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  filter === category.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-white/60 dark:bg-slate-800/60 rounded-xl shadow-lg overflow-hidden backdrop-blur ring-1 ring-white/20 dark:ring-slate-700/20 opacity-0 transform translate-y-12 transition-all duration-300 hover:transform hover:translate-y-[-8px] hover:shadow-xl"
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/90 text-gray-800 rounded-md hover:bg-white transition-colors backdrop-blur"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Demo
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
