import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar, { SidebarProvider } from "@/components/layout/Sidebar";
import type { SidebarEntry } from "@/components/layout/Sidebar";
import { getAllArtworks } from "@/lib/getArtworks";

export const metadata: Metadata = {
  title: "Cultural Visions | RMIT University Vietnam",
  description:
    "A curatorial archive of student photography from RMIT University Vietnam, celebrating Vietnamese culture, heritage, and contemporary life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarEntries: SidebarEntry[] = getAllArtworks().map((aw) => ({
    slug: aw.slug,
    catalogueId: aw.catalogueId,
    title: aw.title,
    year: aw.year,
    campus: aw.campus,
    isHonored: aw.isHonored,
  }));

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Newsreader:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Space+Grotesk:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      >
        <SidebarProvider>
          <Header />
          <Sidebar entries={sidebarEntries} />
          <main className="flex-1">{children}</main>
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
