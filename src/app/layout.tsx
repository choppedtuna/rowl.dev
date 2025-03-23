import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
import Layout from '@/components/layout'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'rowl.dev',
  description: 'Portfolio showcasing ROBLOX programming projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <style dangerouslySetInnerHTML={{ 
          __html: `
            :root { color-scheme: dark; }
            body { background-color: hsl(var(--background)); }
          `
        }} />
      </head>
      <body className={jetbrainsMono.className}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
} 