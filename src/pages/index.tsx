import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { GithubLogo } from "phosphor-react";
import CardTask from "../components/CardTask/CardTask";

import Orbit from "../components/Orbit/Orbit";
import Panel from "../components/Panel/Panel";
import Grid from "./../components/Grid/Grid";

const Home: NextPage = () => {
  return (
    <>
      <Grid className="flex gap-20">
        <Panel className="bg-red-100" canAddCard>
          <CardTask className="bg-red-200" />
          <CardTask className="bg-red-200" />
          <CardTask className="bg-red-200" />
          <CardTask className="bg-red-200" />
          <CardTask className="bg-red-200" />
        </Panel>
        <Panel className="bg-red-100">
          <CardTask className="bg-red-200" />
        </Panel>
      </Grid>
    </>
  );
};

export default Home;
