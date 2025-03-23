import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
  skills?: string[];
  icon: React.ReactNode;
}

export interface ExperienceSectionConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  itemsPerRow: 1 | 2 | 3;
  showSkills: boolean;
  animate: boolean;
}

// Default section configuration
export const defaultConfig: ExperienceSectionConfig = {
  sectionTitle: "Experience",
  sectionSubtitle: "My professional journey and qualifications",
  itemsPerRow: 2,
  showSkills: true,
  animate: true
};

const experiences: Experience[] = [
  {
    title: "Senior Game Developer",
    organization: "ROBLOX Studio",
    period: "2020 - Present",
    description: "Led development of multiple successful games with over 5 million combined plays. Implemented complex game mechanics and optimized performance.",
    skills: ["Lua", "Game Design", "UI/UX", "Performance Optimization"],
    icon: React.createElement(WorkIcon)
  },
  {
    title: "Frontend Developer",
    organization: "Tech Company",
    period: "2019 - 2020",
    description: "Developed responsive web applications using React and TypeScript. Collaborated with UX designers to implement intuitive user interfaces.",
    skills: ["React", "TypeScript", "CSS", "Responsive Design"],
    icon: React.createElement(CodeIcon)
  },
  {
    title: "Computer Science Degree",
    organization: "University",
    period: "2016 - 2019",
    description: "Studied algorithms, data structures, and software engineering principles. Developed projects using various programming languages and frameworks.",
    skills: ["JavaScript", "Python", "Data Structures", "Algorithms"],
    icon: React.createElement(SchoolIcon)
  },
  {
    title: "Game Development Internship",
    organization: "Indie Game Studio",
    period: "Summer 2018",
    description: "Assisted in development of mobile games. Implemented game features and fixed bugs under senior developer supervision.",
    skills: ["Unity", "C#", "Mobile Development", "Collaboration"],
    icon: React.createElement(BusinessCenterIcon)
  }
];

export default experiences; 