import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Image src="/roblox-logo.png" alt="ROBLOX Logo" width={32} height={32} className="rounded-sm" />
            <span className="hidden sm:inline-block">ROBLOX Developer Portfolio</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/#games" className="transition-colors hover:text-primary">Games</Link>
              <Link href="/#achievements" className="transition-colors hover:text-primary">Achievements</Link>
              <Link href="/#contact" className="transition-colors hover:text-primary">Contact</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="container py-24 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Ben Rowlands</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Creating immersive experiences and engaging gameplay for millions of players on the ROBLOX platform
        </p>
        <div className="flex gap-4">
          <Link href="/#contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Contact Me
          </Link>
          <Link href="/#games" className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
            View My Work
          </Link>
        </div>
      </section>

      <section id="games" className="w-full py-12 bg-muted">
        <div className="container space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Games</h2>
            <p className="text-muted-foreground">
              Check out my most popular ROBLOX games and experiences
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* Game Card 1 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-video overflow-hidden">
                <Image src="/game1.jpg" alt="Game 1" width={600} height={340} className="object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Zombie Survival</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  A thrilling survival game where players must defend against waves of zombies
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>2.5M+ Plays</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <span>95% Rating</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Game Card 2 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-video overflow-hidden">
                <Image src="/game2.jpg" alt="Game 2" width={600} height={340} className="object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Tycoon Adventure</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Build and manage your own empire in this addictive tycoon simulator
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>3.8M+ Plays</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <span>92% Rating</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Game Card 3 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-video overflow-hidden">
                <Image src="/game3.jpg" alt="Game 3" width={600} height={340} className="object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Racing Simulator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Race against friends and competitors in high-speed action
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>1.7M+ Plays</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <span>89% Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="w-full py-12">
        <div className="container space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Achievements</h2>
            <p className="text-muted-foreground">
              Key milestones and accomplishments from my ROBLOX development journey
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="m4.93 4.93 2.83 2.83"></path><path d="m16.24 16.24 2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="m4.93 19.07 2.83-2.83"></path><path d="m16.24 7.76 2.83-2.83"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">10 Million Total Plays</h3>
                  <p className="text-sm text-muted-foreground">Across all published games and experiences</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path><circle cx="17" cy="7" r="5"></circle></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Featured Game</h3>
                  <p className="text-sm text-muted-foreground">Featured on ROBLOX front page for 3 weeks</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8.56 2.9A7 7 0 0 1 19 9v4a3 3 0 0 0 3 3h0a3 3 0 0 1-3 3H5v0a7 7 0 0 1 3.56-13.1z"></path><rect width="8" height="5" x="2" y="14" rx="1"></rect></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Top-Rated Developer</h3>
                  <p className="text-sm text-muted-foreground">Consistently high ratings across published work</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">ROBLOX Innovation Award</h3>
                  <p className="text-sm text-muted-foreground">For unique game mechanics and innovation</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m22 9-10 13L2 9l10-7 10 7z"></path><path d="m22 9-10-7-10 7"></path><path d="M12 22V9"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Community Recognition</h3>
                  <p className="text-sm text-muted-foreground">Active community engagement and support</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Development Expertise</h3>
                  <p className="text-sm text-muted-foreground">Advanced scripting and game architecture skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full py-12 bg-muted">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have a project idea or want to collaborate? Fill out the form and I'll get back to you as soon as possible.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>ROBLOX: @yourusername</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M5 7.5A.5.5 0 0 1 5.5 7H18a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5H5.5a.5.5 0 0 1-.5-.5v-9Z"></path><path d="M5.8 8.3 12 13l6.2-4.7"></path></svg>
                <span>email@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                <span>Twitter: @yourusername</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <input
                  id="subject"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Subject"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2023 ROBLOX Developer Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
} 