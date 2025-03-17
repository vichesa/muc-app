import "bootstrap/dist/css/bootstrap.min.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import TaskTable from "./components/TaskTable";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Task Management System",
  description: "Task Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased h-[100vh] bg-black text-white`}
      >
        <div className="mt-8 mb-2 text-4xl font-bold text-center">
          Task Management System
        </div>
        <Header />
        <div className="mx-20 my-10">{children}</div>
      </body>
    </html>
  );
}
