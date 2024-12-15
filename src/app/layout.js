'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import { usePathname } from "next/navigation";
import { disableNav } from './utils/disableNav'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify styles

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

          {children}
        </div>
      </body>
    </html>
  );
}
