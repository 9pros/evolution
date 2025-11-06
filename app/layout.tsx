import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { QueryClient } from '@tanstack/react-query'
import { QueryProvider } from '@/components/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Evolution AI - Next Generation AI App Builder',
  description: 'Build applications with AI-powered chat interface, intelligent agents, and real-time collaboration.',
  keywords: ['AI', 'app builder', 'no-code', 'artificial intelligence', 'development'],
  authors: [{ name: 'Evolution AI Team' }],
  openGraph: {
    title: 'Evolution AI - Next Generation AI App Builder',
    description: 'Build applications with AI-powered chat interface, intelligent agents, and real-time collaboration.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster position="bottom-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}