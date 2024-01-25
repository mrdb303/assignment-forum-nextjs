import { Inter } from "next/font/google";
import Link from "next/link";
import Header from "../components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog project",
  description: "Simple blog in React and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
       
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
        </nav>
       

        {children}

      </body>
    </html>
  );
}
