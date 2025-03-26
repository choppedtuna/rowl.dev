import React from 'react';
import { Briefcase, Code, GraduationCap, Building } from 'lucide-react';

export interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
  location?: string;
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
    title: "Senior Game Developer (Contractor)",
    organization: "The Gang Sweden",
    period: "2024 - Present",
    description: "Developed IP Activations for Netflix's 'Electric State', 'Squid Game' and 'NFL', reaching Peak CCU on NextWorld",
    location: "Remote",
    skills: ["Lua", "Game Design", "UI/UX", "Performance Optimization"],
    icon: React.createElement(Briefcase, { className: "w-5 h-5 text-zinc-300" })
  },
  {
    title: "Senior Game Developer (Contractor)",
    organization: "Buoy Studio",
    period: "2023 - 2024",
    description: "Developed IP Activations for Netflix's 'One Piece', as well as main game title 'NextWorld'",
    skills: ["Lua", "Game Design", "UI/UX", "Performance Optimization"],
    icon: React.createElement(Code, { className: "w-5 h-5 text-zinc-300" })
  },
  {
    title: "Senior Game Developer",
    organization: "Talewind Studio",
    period: "2022 - 2023",
    description: "Developed a GitHub release pipeline & APIs for social media integration on 'Chicken Life'. Managed feature releases. Provided mentorship to Junior Developers",
    skills: ["Lua", "Game Design", "UI/UX", "Performance Optimization", "API Development"],
    icon: React.createElement(GraduationCap, { className: "w-5 h-5 text-zinc-300" })
  },
  {
    title: "Software Engineer",
    organization: "Aforza",
    period: "2021 - 2022",
    description: "Created API solutions for B2B clients on Google Cloud Platform. Optimised all solutions using Redis caching to ensure high availability and scalability",
	skills: ["Node.js", "Typescript","Google Cloud Platform", "Redis", "API Development"],
	location: "Cardiff, UK",
    icon: React.createElement(Building, { className: "w-5 h-5 text-zinc-300" })
  }
];

export default experiences; 