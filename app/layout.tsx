import "./globals.css";
import clsx from "clsx";
import localFont from "@next/font/local";
import Sidebar from "../components/sidebar";
import AnalyticsWrapper from "../components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";

const kaisei = localFont({
  src: "../public/fonts/kaisei-tokumin-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-kaisei",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Darius McFarland",
    template: "%s | Darius McFarland",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Lee Robinson",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
    yandex: "14d2e73487fa6c71",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html
        suppressHydrationWarning
        lang="en"
        className={clsx(kaisei.variable)}
      >
        <body className="antialiased overflow-x-hidden max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto ">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Sidebar />
            <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
              {children}
            </main>
          </ThemeProvider>
          <AnalyticsWrapper />
        </body>
      </html>
    </>
  );
}
