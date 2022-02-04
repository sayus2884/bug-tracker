import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { GithubLogo } from "phosphor-react";

import Orbit from "../components/Orbit/Orbit";

const Home: NextPage = () => {
  return (
    <div className="bg-chocolate h-screen">
      <Head>
        <title>Under Construction</title>
        <meta name="description" content="Bug tracker made with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="absolute right-100 top-100 text-white bg-blackberry p-45 rounded-md z-50 tracking-wide">
          <div className="flex flex-col gap-20 max-w-[800px]">
            <h1 className="text-32">Bug Tracker is Under Construction</h1>
            <p className="text-18">
              Phase: <span>Research and Wireframing</span>
            </p>

            <div className="flex flex-col gap-10 text-justify">
              <h2 className="text-28">Overview</h2>
              <p>
                This is a cap stone project which I will be building and using during and after
                developing the MVP. It is a bug, feature, and task tracker which help manage a
                project's life cycle from beginning to end. The project is open-source, so feel free
                to use it for your own use.
              </p>
              <p>
                Currently, the project is undergoing research for possible features to add into the
                application. It will simultaneously undergo wireframing to sort out the flow and
                user experience of the app which will then be prototyped using Figma.
              </p>
            </div>

            <button className="flex w-fit border border-apple text-apple px-15 py-10 rounded-md self-end mt-20 hover:text-peach hover:text-white hover:border-white active:bg-peach">
              <a
                href="https://github.com/sayus2884/bug-tracker"
                target="_blank"
                className="flex items-center space-x-1">
                <GithubLogo size={20} /> <span>View on Github</span>
              </a>
            </button>
          </div>
        </div>
        <div className="fixed justify-center items-center h-screen -bottom-100 -left-300">
          <Orbit className="h-orbit w-orbit" />
        </div>
      </main>
    </div>
  );
};

export default Home;
