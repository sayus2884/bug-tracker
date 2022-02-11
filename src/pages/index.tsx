import type { NextPage } from "next";
import CardTask from "../components/CardTask/CardTask";

import Panel from "../sections/Panel/Panel";
import Grid from "./../components/Grid/Grid";
import useStore from "./../hooks/use-store";
import { useState } from "react";

const Home: NextPage = () => {
  const { getProject } = useStore();
  const [currentProject, setCurrentProject] = useState(getProject("test"));

  console.log(currentProject);

  return (
    <>
      <Grid className="flex gap-20">
        <Panel title="Backlogs" className="bg-red-100" tasks={currentProject.tasks} canAddCard />
      </Grid>
    </>
  );
};

export default Home;
