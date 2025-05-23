import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Code,
  Briefcase,
  Mail,
  FileJson,
  LogIn,
  Server,
  Database,
  GitBranch,
  ExternalLink,
  Calendar,
  MapPin,
  User,
  Smartphone,
  Monitor,
  Palette,
  Globe,
  Coffee,
} from "lucide-react";

import profile from "../assets/aldair.jpg";
import asheri from "../assets/asheri.png";
import rpm from "../assets/rpm.png";
import mercaAPP from "../assets/mercaAPP.png";

// Simulated images - replace with your actual images
const IMAGES = {
  profile: profile,
  rpm: rpm,
  asheri: asheri,
  mercaAPP: mercaAPP,
};

// Custom hooks for better code organization
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollProgress;
};

// Components
const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-900/50 backdrop-blur-sm z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
};

const SkillCard = ({ skill, icon: Icon, level = 85 }) => {
  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300">
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <span className="font-semibold text-white">{skill}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Competencia</span>
            <span className="text-blue-400 font-medium">{level}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: isVisible ? `${level}%` : "0%",
                transitionDelay: "300ms",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  link,
  type,
}) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

        {/* Project Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            {type}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-300 leading-relaxed">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 text-sm rounded-full border border-blue-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <span>Ver Proyecto</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  technologies,
}) => {
  return (
    <div className="relative">
      {/* Timeline Connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500" />
      <div className="absolute left-0 top-6 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 shadow-lg shadow-blue-500/50" />

      {/* Content */}
      <div className="ml-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-blue-400 font-medium">{company}</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-sm mt-2 sm:mt-0">
            <Calendar className="w-4 h-4" />
            <span>{period}</span>
          </div>
        </div>

        <div className="space-y-3 text-gray-300">
          {description.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p>{item}</p>
            </div>
          ))}
        </div>

        {technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-md border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const skills = [
    { name: "JavaScript", icon: FileJson, level: 90 },
    { name: "React", icon: LogIn, level: 85 },
    { name: "Node.js", icon: Server, level: 80 },
    { name: "SQL", icon: Database, level: 85 },
    { name: "MongoDB", icon: Database, level: 75 },
    { name: "Git", icon: GitBranch, level: 80 },
    { name: "HTML", icon: Code, level: 90 },
    { name: "CSS", icon: Palette, level: 85 },
    { name: "Tailwind CSS", icon: Monitor, level: 80 },
    { name: "Firebase", icon: Smartphone, level: 75 },
    { name: "Express.js", icon: Server, level: 80 },
    { name: "API REST", icon: Globe, level: 85 },
    { name: "Typescript", icon: Code, level: 70 },
  ];

  const projects = [
    {
      title: "Aplicación móvil con soporte web para motoviajeros",
      description:
        "Aplicación diseñada para motoviajeros en Colombia. Permite trazar rutas personalizadas, gestionar información sobre motocicletas y calcular presupuestos de combustible, promoviendo el moto-turismo responsable.",
      image: IMAGES.asheri,
      technologies: ["React", "JavaScript", "MongoDB", "CSS", "Firebase"],
      type: "Móvil & Web",
      link: "",
      participation:
        "Participé en la implementación de funcionalidades clave y en el manejo de imágenes mediante Firebase Storage, incluyendo la carga, visualización y gestión desde el frontend en React y en el backend con Node.js.",
    },
    {
      title: "Aplicación móvil con soporte web para motoviajeros",
      description:
        "Aplicación diseñada a la medida para motoviajeros en Colombia. Permite trazar rutas personalizadas, gestionar información sobre motocicletas y calcular presupuestos de combustible, promoviendo el moto-turismo responsable.",
      image: IMAGES.rpm,
      technologies: ["React", "JavaScript", "MongoDB", "CSS", "Firebase"],
      type: "Móvil & Web",
      link: "",
      participation:
        "Participé como desarrollador fullstack en el desarrollo de un software a la medida, implementando funcionalidades específicas, gestionando imágenes con Firebase Storage desde el frontend en React y el backend con Node.js, y asegurando una integración fluida entre la interfaz de usuario y la lógica del servidor.",
    },
    {
      title: "MercaAPP",
      description:
        "Aplicación diseñada para la gestión integral de usuarios, productos, inventarios y ventas, dirigida a microempresarios y pequeños vendedores. Desarrollada a la medida para optimizar el control y la administración eficiente de inventarios y procesos de venta.",
      image: IMAGES.mercaAPP, // O usa "/img/mercaAPP.png" si está en public
      technologies: ["TypeScript", "MongoDB", "Firebase"],
      type: "Web App",
      link: "https://prueba-mercapp--1.expo.app/",
      participation:
        "Participé como desarrollador backend, encargado de implementar la lógica del servidor, el manejo de base de datos con MongoDB, la gestión de productos e inventarios, y el sistema de notificaciones utilizando Firebase.",
    },
  ];

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "ASERHI SAS ESP",
      period: "Septiembre 2023 - Octubre 2024",
      description: [
        "Colaboré en el desarrollo de una aplicación web utilizando JavaScript, MySQL, React y Tailwind CSS.",
        "Implementé funcionalidades como dashboards interactivos con estadísticas dinámicas, además de la descarga de reportes en formato PDF.",
        "Colaboré en la gestión de residuos, propuestas y contratos, trabajando de manera efectiva en equipo.",
      ],
      technologies: [
        "React",
        "JavaScript",
        "MySQL",
        "Tailwind CSS",
        "PDF Generation",
      ],
    },
    {
      title: "Backend Developer, Mobile Developer",
      company: "Rutas para Moteros",
      period: "Enero 2024 - Marzo 2024",
      description: [
        "Participé en la creación del backend para este proyecto.",
        "Estuve a cargo del desarrollo de la parte móvil, gestionando la subida de imágenes mediante bases de datos en Firebase.",
      ],
      technologies: [
        "Node.js",
        "Firebase",
        "React vite",
        "JavaScript",
        "kotlin",
      ],
    },
    {
      title: "Backend Developer",
      company: "MercaAPP",
      period: "marzo 2025 - junio 2025",
      description: ["Participé en la creación del backend para este proyecto."],
      technologies: ["Node.js", "Firebase", "MongoDB", "TypeScript"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-x-hidden">
      <ScrollProgress />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <AnimatedSection className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Profile Image */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 scale-110" />
              <img
                src={IMAGES.profile}
                alt="Jose Aldair Torres"
                className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover mx-auto border-4 border-blue-500/50 shadow-2xl shadow-blue-500/25"
                loading="eager"
              />
            </div>

            {/* Name and Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Jose Aldair Torres
              </span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 font-light">
              Desarrollador Full-Stack
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Code, label: "Proyectos", value: "10+" },
                { icon: Coffee, label: "Experiencia", value: "1+ Año" },
                { icon: Globe, label: "Tecnologías", value: "5+" },
                { icon: User, label: "Clientes", value: "1+" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl mb-2">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1">
              <span>Ver mi trabajo</span>
              <ExternalLink className="w-5 h-5" />
            </button> */}
          </div>
        </AnimatedSection>

        <div className="max-w-7xl mx-auto px-4 py-16 space-y-32">
          {/* About Section */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Sobre mí
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-gray-700/50">
                <p className="text-lg sm:text-xl leading-relaxed text-gray-300 text-center">
                  Soy un desarrollador de software full-stack con más de un año
                  de experiencia en la creación de aplicaciones web. También he
                  participado en el desarrollo de una aplicación móvil, aunque
                  mi especialidad se centra más en la creación de aplicaciones
                  web robustas y escalables. Me especializo en JavaScript,
                  React, Node.js y bases de datos SQL y NoSQL. Me destaco por mi
                  rápida capacidad de aprendizaje y adaptación a nuevos
                  entornos. Mi objetivo es ofrecer soluciones que generen un
                  impacto positivo, mientras busco oportunidades para adquirir
                  más experiencia y colaborar aplicando mis habilidades.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection delay={200}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Habilidades
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                />
              ))}
            </div>
          </AnimatedSection>

          {/* Projects Section */}
          <AnimatedSection delay={400}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Proyectos
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </AnimatedSection>

          {/* Experience Section */}
          <AnimatedSection delay={600}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Experiencia
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard key={index} {...experience} />
              ))}
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection delay={800}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Contacto
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xl text-gray-300 mb-12">
                ¿Tienes un proyecto en mente? Me encantaría colaborar contigo.
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.linkedin.com/in/aldair-torres-650b12311/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <div className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </a>

                <a
                  href="https://github.com/aldair507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/20 hover:-translate-y-1"
                  aria-label="GitHub"
                >
                  <div className="w-6 h-6 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                </a>

                <a
                  href="mailto:aldairtorres507@gmail.com"
                  className="group relative p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20 hover:-translate-y-1"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
                </a>

                <a
                  href="https://wa.me/+573173394816"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-1"
                  aria-label="WhatsApp"
                >
                  <div className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.402 0 .878 4.521.875 10.107A11.958 11.958 0 003.21 18.18L.875 24l6.042-1.585a11.958 11.958 0 005.662 1.44h.005c6.648 0 12.072-4.522 12.075-10.107a10.82 10.82 0 00-3.18-7.641" />
                    </svg>
                  </div>
                </a>
              </div>

              {/* Download CV Button */}
              <div className="mt-12">
                <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <a href="/portfoleo/public/Hoja_de_vida_Aldair.pdf" download>
                    <span>Descargar CV</span>
                  </a>
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Jose Aldair Torres
                </span>
              </div>

              <p className="text-gray-400 mb-6">
                Desarrollador Full-Stack | Creando soluciones digitales
                innovadoras
              </p>

              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Colombia</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>aldairtorres507@gmail.com</span>
                </div>
              </div>

              <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Jose Aldair Torres. Todos los
                derechos reservados.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
