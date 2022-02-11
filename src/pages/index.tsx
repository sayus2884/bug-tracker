import type { NextPage } from "next";
import CardTask from "../components/CardTask/CardTask";

import Panel from "../sections/Panel/Panel";
import Grid from "./../components/Grid/Grid";
import useStore, { Project, Task } from "./../hooks/use-store";
import { useState } from "react";

const Home: NextPage = () => {
  const { getProject } = useStore();
  const [currentProject, setCurrentProject] = useState(getProject("test"));

  const handleOnTaskAdded = (newTask: Task): void => {
    setCurrentProject((project): Project => {
      project.tasks.push(newTask);
      return project;
    });
  };

  //TODO: Change currentProject.name to id
  return (
    <>
      <Grid className="flex gap-20">
        <Panel
          title="Backlogs"
          className="bg-red-100"
          projectId={currentProject.name}
          tasks={currentProject.tasks}
          canAddCard
          onTaskAdded={handleOnTaskAdded}
        />
      </Grid>
    </>
  );
};

export default Home;
