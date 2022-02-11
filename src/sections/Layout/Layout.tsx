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

      <main className="pt-64 h-full bg-gray-50">
        <div className="py-15 px-45 h-full overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
