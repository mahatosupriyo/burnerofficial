import type { Metadata } from "next";
import "../styles/global.scss";
import Head from "next/head";
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "Edu Burner",
  description: "Learn & Build The Future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}