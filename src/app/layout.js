import { Inter } from "next/font/google";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Disclaimer from "../components/Disclaimer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rate My Top Tips",
  description: "Rate top tips in a forum style",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Show Tips</Link>
          <Link href="/posts/addpost">Add a Tip</Link>
          <Link href="/posts/categories">List Categories</Link>
        </nav>
        
       
        <div id="wrapper">
          <div id="child-wrapper">
            {children}
            <Disclaimer/>
          </div>
        </div>

        <Footer/>
      </body>
    </html>
  );
}
