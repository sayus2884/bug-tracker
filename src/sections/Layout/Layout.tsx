import React from "react";
import Head from "next/head";
import Nav from "../Nav/Nav";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Bug Tracker</title>
        <meta name="description" content="Bug tracker made with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav className="absolute w-full h-64 px-25 bg-wood text-white fixed" />

      <main className="pt-64 h-full bg-paper h-screen">
        <div className="py-15 px-45 h-full overflow-auto">
          <div className="overflow-auto h-full rounded">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
