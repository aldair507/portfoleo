import React, { useEffect, useRef, useState } from "react";
import {
  Code,
  Briefcase,
  Mail,
  ChevronRight,
  FileJson,
  LogIn,
  Server,
  Database,
  GitBranch,
} from "lucide-react";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const PortfolioSection = ({ title, children, icon }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Cambia este valor para ajustar cuándo el elemento se considera visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`mb-24 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center text-indigo-400">
        {icon}
        <span className="ml-3">{title}</span>
      </h2>
      {children}
    </section>
  );
};

const SkillItem = ({ skill, icon: Icon }) => (
  <div className="bg-gray-800 text-indigo-300 rounded-xl px-4 py-3 flex items-center justify-center font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-700">
    <Icon className="w-6 h-6 mr-2" />
    <span>{skill}</span>
  </div>
);

const PortfolioItem = ({ title, description, link }) => (
  <div className="mb-6 p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
    <h3 className="text-2xl font-semibold mb-3 text-indigo-400">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <a
      href={link}
      className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ver proyecto
      <ChevronRight className="w-4 h-4 ml-1" />
    </a>
  </div>
);

const PorfoleoSection = () => {
  const skills = [
    { name: "JavaScript", icon: FileJson },
    { name: "React", icon: LogIn },
    { name: "Node.js", icon: Server },
    { name: "SQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "Git", icon: GitBranch },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-24">
          <h1 className="text-5xl font-extrabold mb-4 text-indigo-400">
            Jose Aldair Torres
          </h1>
          <p className="text-2xl text-indigo-300 font-light">
            Desarrollador Full-Stack
          </p>
        </header>

        <PortfolioSection
          title="Sobre mí"
          icon={<Code className="w-8 h-8" />}
        >
          <p className="text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto">
            Soy un apasionado desarrollador full-stack con +1 de experiencia en
            la creación de aplicaciones web robustas y escalables. Me
            especializo en JavaScript, React, Node.js y bases de datos SQL y
            NoSQL.
          </p>
        </PortfolioSection>

        <PortfolioSection
          title="Habilidades"
          icon={<Code className="w-8 h-8" />}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 cursor-pointer">
            {skills.map((skill) => (
              <SkillItem
                key={skill.name}
                skill={skill.name}
                icon={skill.icon}
              />
            ))}
          </div>
        </PortfolioSection>

        <PortfolioSection
          title="Proyectos"
          icon={<Briefcase className="w-8 h-8" />}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <PortfolioItem
              title="E-commerce Platform"
              description="Una plataforma de comercio electrónico completa construida con React y Node.js."
              link="#"
            />
            <PortfolioItem
              title="Task Management App"
              description="Una aplicación de gestión de tareas con autenticación de usuarios y almacenamiento en tiempo real."
              link="#"
            />
            <PortfolioItem
              title="Blog Personal"
              description="Un blog personal construido con Gatsby y GraphQL para un rendimiento óptimo."
              link="#"
            />
          </div>
        </PortfolioSection>

        <PortfolioSection
          title="Contacto"
          icon={<Mail className="w-8 h-8" />}
        >
          <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-2xl font-bold mb-4">Contáctame</h2>

            {/* Botones de redes sociales */}
            <div className="flex space-x-6">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/aldair-torres-650b12311/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <FaLinkedin size={40} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/aldair507"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-black transition duration-300"
              >
                <FaGithub size={40} />
              </a>

              {/* Gmail */}
              <a
                href="mailto:aldairtorres507@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                <SiGmail size={40} />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/+573173394816" // Cambia el número con tu número de WhatsApp en formato internacional
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-700 transition duration-300"
              >
                <FaWhatsapp size={40} />
              </a>
            </div>
          </div>
        </PortfolioSection>
      </div>
    </div>
  );
};

export default PorfoleoSection;
