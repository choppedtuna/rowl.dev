"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import SectionTitle from "./section-title";
import { MapPin } from "lucide-react";
import experiences from "@/data/experiences";

// Tech stack icons
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, 
  SiNextdotjs, SiTailwindcss, SiFramer, SiNodedotjs, 
  SiExpress, SiMongodb, SiRedux, SiGit, SiGithub,
  SiVercel, SiPostman, SiCplusplus, SiFigma,
  SiLua,
  SiRedis
} from "react-icons/si";

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const techStacks = [
    { icon: <SiLua className="h-5 w-5 text-blue-500" />, name: "Lua" },
    { icon: <SiTypescript className="h-5 w-5 text-blue-600" />, name: "TypeScript" },
    { icon: <SiNodedotjs className="h-5 w-5 text-green-500" />, name: "NodeJS" },
    { icon: <SiGit className="h-5 w-5 text-red-500" />, name: "Git" },
    { icon: <SiGithub className="h-5 w-5" />, name: "GitHub" },
    { icon: <SiExpress className="h-5 w-5" />, name: "ExpressJS" },
    { icon: <SiRedis className="h-5 w-5 text-purple-600" />, name: "Redis" },
    { icon: <SiPostman className="h-5 w-5 text-orange-500" />, name: "Postman" },
    { icon: <SiFigma className="h-5 w-5 text-purple-400" />, name: "Figma" },
  ];

  return (
    <section id="about" className="py-16 pt-24 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle="Get to know me" centered={true} />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Left Column - Profile Image and Bio */}
          <div className="md:col-span-1">
            <motion.div variants={sectionVariants} className="text-center md:text-left">
              <div className="mb-6 mx-auto md:mx-0 w-64 h-64 relative">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
					<Image src="/images/profile.jpeg" alt="Profile" fill className="rounded-full" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-white/80">
                  I'm a passionate Developer who loves building robust, engaging and fun experiences for players and brands.
				</p>
				<p className="text-white/80">
				  I work best with creating advanced and complex applications, pushing the limits of what is possible on the platform.
				</p>
				<p className="text-white/80">
				  I'm always looking for new and exciting projects to work on, and I'm always looking forward to apply my skills to new and challenging projects.
				</p>
                <div className="flex items-center justify-center md:justify-start text-white/70">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Cardiff, United Kingdom</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sections */}
          <div className="md:col-span-2 space-y-8">
            {/* Education Section */}
            <motion.div variants={sectionVariants} className="border-b border-white/20 pb-8">
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h4 className="font-semibold">Cardiff Metropolitan University</h4>
                  <p className="text-white/70">Software Engineering</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p>2022 - 2024</p>
                  <p className="text-white/70">Upper Second Class Honours (2:1)</p>
                </div>
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div variants={sectionVariants} className="border-b border-white/20 pb-8">
              <h3 className="text-xl font-bold mb-4">Experience</h3>
              {experiences.map((experience, idx) => (
                <div key={idx} className={idx > 0 ? "mt-8" : ""}>
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{experience.organization}</h4>
                      <p className="text-white/70">{experience.title}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p>{experience.period}</p>
                      <p className="text-white/70">{experience.location || "Remote"}</p>
                    </div>
                  </div>
                  <ul className="list-none space-y-2 mt-4">
                    {experience.description.split('. ').filter(Boolean).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-4 w-1 bg-white/60"></div>
                        <p>{point}</p>
                      </li>
                    ))}
                  </ul>
                  {experience.skills && experience.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {experience.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-700 rounded-md text-xs text-zinc-300 font-mono shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Tech Stack Section */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStacks.map((tech, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-gradient-to-r from-purple-500/20 to-orange-500/20 hover:from-purple-500/30 hover:to-orange-500/30 rounded-full px-3 py-2 border border-purple-500/30 transition-all duration-300"
                  >
                    <div className="mr-2">{tech.icon}</div>
                    <span className="text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}