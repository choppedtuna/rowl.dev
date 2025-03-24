import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import AccomplishmentsSection from "@/components/accomplishments-section"
import ContactSection from "@/components/contact-section"
import TechStackSection from "@/components/tech-stack-section"
import ZoomSection from "@/components/zoom-section"
import { Box, useTheme } from "@mui/material"

export const metadata: Metadata = {
  title: "Ben Rowlands (rowl.dev)",
  description: "Portfolio showcasing ROBLOX programming projects and skills",
}

export default function HomePage() {
  // Use theme to access color values
  return (
    <Box className="min-h-screen bg-background" sx={{ overflow: 'hidden' }}>
      <Box component="main">
        {/* Hero - show blend at bottom only */}
        <ZoomSection 
          zoomOptions={{ threshold: 0.2, zoomFactor: 0.05 }}
          blendOptions={{ 
            blendTop: false, 
            blendBottom: true,
            blendColor: 'currentcolor',
            blendHeight: '180px',
            blendOpacity: 0.1
          }}
        >
          <HeroSection />
        </ZoomSection>
        
        {/* Projects - blend at top and bottom */}
        <ZoomSection 
          zoomOptions={{ threshold: 0.15, zoomFactor: 0.08 }}
          blendOptions={{ 
            blendTop: true, 
            blendBottom: true,
            blendColor: 'currentcolor',
            blendHeight: '150px',
            blendOpacity: 0.12
          }}
        >
          <ProjectsSection />
        </ZoomSection>
        
        {/* Tech Stack - blend at top and bottom */}
        <ZoomSection 
          zoomOptions={{ threshold: 0.15, zoomFactor: 0.07 }}
          blendOptions={{ 
            blendTop: true, 
            blendBottom: true,
            blendColor: 'currentcolor',
            blendHeight: '160px',
            blendOpacity: 0.1
          }}
        >
          <TechStackSection />
        </ZoomSection>
        
        {/* Experience - blend at top and bottom */}
        <ZoomSection 
          zoomOptions={{ threshold: 0.15, zoomFactor: 0.06 }}
          blendOptions={{ 
            blendTop: true, 
            blendBottom: true,
            blendColor: 'currentcolor',
            blendHeight: '150px',
            blendOpacity: 0.09
          }}
        >
          <ExperienceSection />
        </ZoomSection>
        
        {/* Accomplishments - blend at top and bottom */}
        <ZoomSection 
          zoomOptions={{ threshold: 0.15, zoomFactor: 0.07 }}
          blendOptions={{ 
            blendTop: true, 
            blendBottom: true,
            blendColor: 'currentcolor',
            blendHeight: '160px',
            blendOpacity: 0.11
          }}
        >
          <AccomplishmentsSection />
        </ZoomSection>
        
        {/* Contact - blend at top only, no bottom blend since it's the last section */}
        <ZoomSection 
          zoomOptions={{ threshold: 0.2, zoomFactor: 0.05 }}
          blendOptions={{ 
            blendTop: true, 
            blendBottom: false,
            blendColor: 'currentcolor',
            blendHeight: '180px',
            blendOpacity: 0.1
          }}
        >
          <ContactSection />
        </ZoomSection>
      </Box>
    </Box>
  )
} 