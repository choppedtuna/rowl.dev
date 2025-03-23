import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import AccomplishmentsSection from "@/components/accomplishments-section"
import ContactSection from "@/components/contact-section"
import { Box } from "@mui/material"

export const metadata: Metadata = {
  title: "Ben Rowlands (rowl.dev)",
  description: "Portfolio showcasing ROBLOX programming projects and skills",
}

export default function HomePage() {
  return (
    <Box className="min-h-screen bg-background" sx={{ overflow: 'hidden' }}>
      <Box component="main">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <AccomplishmentsSection />
        <ContactSection />
      </Box>
    </Box>
  )
} 