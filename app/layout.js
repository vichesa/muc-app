import "bootstrap/dist/css/bootstrap.min.css";
import localFont from "next/font/local";
import "./globals.css";
import TaskTable from "./components/TaskTable";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-20 my-10`}
      >
        <div className="mb-8">{children}</div>
        <div>
          <TaskTable />
        </div>
      </body>
    </html>
  );
}
