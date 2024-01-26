import { Inter } from "next/font/google";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
        <Header/>
       
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/posts/addpost">Add a Post</Link>
          <Link href="/posts/categories">List Categories</Link>
        </nav>
       
        <div id="wrapper">
          <div id="child-wrapper">
            {children}
          </div>
        </div>

        <Footer/>
      </body>
    </html>
  );
}
