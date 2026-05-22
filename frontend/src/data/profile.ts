export const profile = {
  name: "Diego Cruz Oviedo",
  role: "Software Engineering TIDE Intern",
  avatar: "/diego.png",
  contact: {
    email: { label: "diego.d.cruz@pwc.com", href: "mailto:diego.d.cruz@pwc.com" },
    phone: { label: "+52 5516020009", href: null },  
    location: { label: "Coyoacán, CDMX", href: null },
    linkedin: {
      label: "linkedin.com/in/dco180402",
      href: "https://linkedin.com/in/dco180402",
    },
    github: {
      label: "github.com/dcruz060",
      href: "https://github.com/dcruz060",
    },
  },
  summary:
  "Estudiante de Ingeniería Mecatrónica de 10mo semestre con un fuerte registro académico y experiencia práctica en desarrollo de software, integración de sistemas y robótica. Actualmente trabajando como Intern de Ingeniería de Software en PwC, contribuyendo a soluciones tecnológicas enfocadas en automatización y optimización de procesos en el área de Tax.",
  skills: [
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "ASP.NET",
    "SQL",
    "C++",
    "Kotlin",
    "Git",
    "Linux",
    "ROS2",
  ],
  experience: [
    {
      role: "Software Engineering TIDE Intern",
      company: "PwC Acceleration Center Mexico",
      period: "Feb 2026 · Presente",
      description: "Desarrollo de soluciones tecnológicas en el equipo de Tax, optimización de procesos y automatización con stack moderno.",
    },
  ],
  projects: [
    {
      company: "LIRA UNAM",
      name: "Lunar Rover - Robotic Arm",
      period: "Ene 2026 · Presente",
      description: "Desarrollo de nodos ROS2 para control de brazo robótico. Participación en competencia en Puebla, Abril 2026.",
      technologies: ["ROS2", "Python","OpenCV", "Git" ],
    },
    {
      company: "LIRA UNAM",
      name: "Combat Robot",
      period: "Ene 2024 · December 2025",
      description: "Diseño, construcción y programación de robots de combate. 3er lugar minisumo y microsumo.",
      technologies: ["C++", "Electrónica", "Diseño mecánico"],
    },
    {
      company: "CIA UNAM",
      name: "Mobile App Prototype",
      period: "Ene 2024 · Sep 2024",
      description: "App Android con Kotlin y Clean Architecture. Extracción y transformación de datos desde API externa.",
      technologies: ["Kotlin", "Android", "MVVM", "REST APIs"],
    },
  ],  
};

export const suggestedQuestions = [
  "¿Cuál es tu experiencia profesional?",
  "¿Qué habilidades técnicas tienes?",
  "¿Cuál es tu puesto actual?",
  "¿Por qué debería contratarte?",
];
