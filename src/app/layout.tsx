import type { Metadata } from "next";
import "../styles/global.scss";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Edu Burner",
  description: "Learn & Build The Future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/aqs6zch.css"></link>
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
