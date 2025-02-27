import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';
import "../styles/global.scss";
import Head from "next/head";

export const metadata: Metadata = {
  metadataBase: new URL('https://eduburner.org'),
  title: {
    default: "Edu Burner - Launchpad for Designers",
    template: "%s | Edu Burner"
  },
  description: "Learn, create, and inspire — this is your Stage.",
  keywords: ["eduburner", "design", "design education", "graphics designing", "design courses", "ux designing", "ui ux", "courses", "tutorials", "graphics"],
  authors: [{ name: "Edu Burner Team" }],
  creator: "Edu Burner",
  publisher: "Edu Burner",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Edu Burner - Launchpad for designers",
    description: "Learn, create, and inspire — this is your Stage.",
    url: 'https://eduburner.org',
    siteName: 'Edu Burner',
    images: [
      {
        url: 'https://eduburner.org/essentials/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edu Burner - Launchpad for designers',
    description: 'Learn, create, and inspire — this is your Stage.',
    images: ['https://eduburner.org/essentials/og.png'],
    creator: '@eduburner',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/ika2qcu.css"></link>
      </Head>
      <body>
        <SessionProvider>
          {children}
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
              style: {
                background: '#363636',
                color: '#fff',
                height: '5.4rem',
                paddingLeft: '1rem',
                display:'flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: '1.56rem',
                borderRadius: '10rem'
              },
            }}
          />
        </SessionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Edu Burner",
              "description": "Learn, create, and inspire — this is your Stage.",
              "url": "https://eduburner.org",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "India",
                "addressLocality": "Kolkata",
                "addressRegion": "Newtown"
              },
              "hasCourse": [
                {
                  "@type": "Burner Pro",
                  "name": "Become Pro Designer",
                  "description": "Learn, create, and inspire — this is your Stage.",
                  "provider": {
                    "@type": "Organization",
                    "name": "Edu Burner",
                    "sameAs": "https://eduburner.org"
                  }
                }
              ],
              "sameAs": [
                "https://instagram.com/eduburner",
                "https://twitter.com/edu_burner",
                "https://linkedin.com/company/eduburner"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "support@eduburner.com",
                "availableLanguage": ["English"]
              },

            })
          }}
        />
      </body>
    </html>
  )
}