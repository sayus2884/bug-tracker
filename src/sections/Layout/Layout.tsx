import React from "react";
import Head from "next/head";
import Nav from "../Nav/Nav";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Under Construction</title>
        <meta name="description" content="Bug tracker made with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav className="absolute w-full h-64 px-25 bg-grape text-white fixed" />

      <main className="pt-64 h-screen bg-gray-50">{children}</main>
    </div>
  );
};

export default Layout;
