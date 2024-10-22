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
        <header className="text-center mb-24 relative h-64 flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-purple-900/30" />
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
          </div>

          <div className="relative z-10 bg-black/50 p-8 rounded-2xl backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(99,102,241,0.4)]">
            <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
              Jose Aldair Torres
            </h1>
            <p className="text-2xl text-indigo-300 font-light drop-shadow-[0_5px_15px_rgba(99,102,241,0.4)]">
              Desarrollador Full-Stack
            </p>

            <div className="mt-4 w-32 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
          </div>

          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-indigo-500/30" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-indigo-500/30" />
        </header>

        <PortfolioSection title="Sobre mí" icon={<Code className="w-8 h-8" />}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-xl" />
            <p className="text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto relative bg-black/20 backdrop-blur-sm p-6 rounded-xl">
              Soy un apasionado desarrollador full-stack con +1 de experiencia
              en la creación de aplicaciones web robustas y escalables. Me
              especializo en JavaScript, React, Node.js y bases de datos SQL y
              NoSQL.
            </p>
          </div>
        </PortfolioSection>

        {/* Habilidades section */}
        <PortfolioSection
          title="Habilidades"
          icon={<Code className="w-8 h-8" />}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillItem
                key={skill.name}
                skill={skill.name}
                icon={skill.icon}
              />
            ))}
          </div>
        </PortfolioSection>

        {/* Proyectos section */}
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

        {/* Contacto section con efectos mejorados */}
        <PortfolioSection title="Contacto" icon={<Mail className="w-8 h-8" />}>
          <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Contáctame
            </h2>
            <div className="flex space-x-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl" />
              <a
                href="https://www.linkedin.com/in/aldair-torres-650b12311/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative hover:scale-110 transition-transform duration-300 text-blue-500 hover:text-blue-400"
              >
                <FaLinkedin size={40} />
              </a>
              <a
                href="https://github.com/aldair507"
                target="_blank"
                rel="noopener noreferrer"
                className="relative hover:scale-110 transition-transform duration-300 text-gray-400 hover:text-gray-300"
              >
                <FaGithub size={40} />
              </a>
              <a
                href="mailto:aldairtorres507@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative hover:scale-110 transition-transform duration-300 text-red-500 hover:text-red-400"
              >
                <SiGmail size={40} />
              </a>
              <a
                href="https://wa.me/+573173394816"
                target="_blank"
                rel="noopener noreferrer"
                className="relative hover:scale-110 transition-transform duration-300 text-green-500 hover:text-green-400"
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
