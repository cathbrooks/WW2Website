import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/styles/drips-tokens.css";
import "@/styles/themes.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "WW2: Form Factory",
  description: "War Room showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("ww2-theme"),m=localStorage.getItem("ww2-mode");if(t&&/^([1-9]|10)$/.test(t)){document.documentElement.setAttribute("data-theme",t);}if(m==="dark"){document.documentElement.setAttribute("data-mode","dark");}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
