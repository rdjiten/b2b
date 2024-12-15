'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import { usePathname } from "next/navigation";
import { disableNav } from './utils/disableNav'
// import { useState } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/login";


  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // Simulate a login check
  //   const token = localStorage.getItem("authToken");
  //   setIsLoggedIn(!!token);
  // }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {disableNav.includes(pathname)
          ?
          ""
          :
          <Navbar />
        }
        {children}
      </body>
    </html>
  );
}
