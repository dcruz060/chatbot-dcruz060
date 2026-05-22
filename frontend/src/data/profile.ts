import cvData from "../../../backend/Data/cv.json";

export const areasOfInterest: string[] = cvData.areasOfInterest ?? [];

export const profile = {
  name: "Diego Cruz Oviedo",
  role: "Software Engineering TIDE Intern\nMechatronics Engineering Student",
  avatar: "/diego.png",
  contact: {
    email: {
      label: "diego.d.cruz@pwc.com",
      href: "mailto:diego.d.cruz@pwc.com",
      external: false,
    },
    phone: { label: "+52 5516020009", href: "tel:+525516020009", external: false },
    location: { label: "Coyoacán, CDMX", href: null, external: false },
    linkedin: {
      label: "Diego Cruz Oviedo",
      href: "https://linkedin.com/in/dco180402",
      external: true,
    },
    github: {
      label: "dcruz060",
      href: "https://github.com/dcruz060",
      external: true,
    },
  },
  summary:
    "10th-semester Mechatronics Engineering student with a strong academic record and hands-on experience in software development, systems integration, and robotics. Currently working as a Software Engineering Intern at PwC, contributing to technology-driven solutions focused on automation and process optimization in the Tax practice.",
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
      period: "Feb 2026 · Present",
      description:
        "Developing technology-driven solutions on the Tax team, process optimization, and automation with a modern stack.",
    },
  ],
  projects: [
    {
      company: "Laboratorio de Investigación y Robótica Avanzada UNAM",
      name: "Lunar Rover - Robotic Arm Lead",
      period: "Jan 2026 · Present",
      description:
        "Leading robotic arm automation with computer vision for target detection and algorithmic path planning for autonomous operations.",
      technologies: ["ROS2", "Python", "OpenCV", "Git", "Automation"],
      image: "/rover.jpg",
    },
    {
      company: "LIRA UNAM",
      name: "Mini and Microsumo Combat Robot",
      period: "Jan 2024 · Dec 2025",
      description: "Design, build, and programming of competition combat robots.",
      technologies: ["C++", "Electronics", "Mechanical design"],
      image: "/mini.jpg",
    },
    {
      company: "Facultad de Ingeniería, UNAM",
      name: "Mobile App Prototype",
      period: "Jan 2024 · Sep 2024",
      description:
        "Android app with Kotlin for recipe search and publishing. Data extraction and transformation from an external API.",
      technologies: ["Kotlin", "Android", "MVVM", "REST APIs"],
      image: null as string | null,
    },
  ],
};

export const suggestedQuestions = [
  "What is his professional experience?",
  "What technical skills does he have?",
  "Who's Diego?",
  "Why should I hire you?",
];
