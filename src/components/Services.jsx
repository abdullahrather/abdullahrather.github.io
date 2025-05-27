import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Full-stack web applications using PHP, Laravel, JavaScript, and React with modern best practices.",
      features: ["Custom Web Applications", "E-commerce Solutions", "CMS Development", "API Integration"]
    },
    {
      icon: "🏢",
      title: "Management Systems",
      description: "Comprehensive business management solutions including ERP, CRM, and document management systems.",
      features: ["Document Management", "Customer Management", "Employee Tracking", "Workflow Automation"]
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Modern, responsive designs that provide excellent user experience across all devices.",
      features: ["Responsive Design", "User Interface Design", "User Experience Optimization", "Modern Animations"]
    },
    {
      icon: "⚙️",
      title: "System Integration",
      description: "Seamless integration with third-party services, APIs, and accounting systems like DATEV.",
      features: ["API Development", "Third-party Integration", "Payment Gateways", "Data Migration"]
    },
    {
      icon: "🛡️",
      title: "Security & Performance",
      description: "Robust security implementations and performance optimizations for scalable applications.",
      features: ["XSS Protection", "CSRF Prevention", "Performance Optimization", "Security Audits"]
    },
    {
      icon: "📱",
      title: "Mobile-First Development",
      description: "Responsive applications that work perfectly on mobile devices and tablets.",
      features: ["Mobile Optimization", "Progressive Web Apps", "Cross-platform Compatibility", "Touch-friendly Interfaces"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I offer comprehensive web development services to help businesses achieve their digital goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;