import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import AccomplishmentsSection from "@/components/accomplishments-section"
import ContactSection from "@/components/contact-section"

export const metadata: Metadata = {
  title: "Senior ROBLOX Programmer Portfolio",
  description: "Portfolio showcasing ROBLOX programming projects and skills",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <ProjectsSection />
        <AccomplishmentsSection />
        <ContactSection />
      </main>
    </div>
  )
} 