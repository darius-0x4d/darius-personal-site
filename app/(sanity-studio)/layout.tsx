import "../(main-site)/globals.css";
import { Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const raleway = Raleway({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata = {
    title: {
        default: "Darius McFarland Sanity Studio",
        template: "%s | Darius McFarland Sanity Studio",
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
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
                className={raleway.className}
            >
                <body className="antialiased overflow-x-hidden">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
                            {children}
                        </main>
                    </ThemeProvider>
                </body>
            </html>
        </>
    );
}
