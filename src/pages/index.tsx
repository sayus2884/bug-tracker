import { useContext, useEffect } from "react";
import type { NextPage } from "next";

import Panel from "../sections/Panel/Panel";
import Grid from "./../components/Grid/Grid";

import useStore, { Project, Task } from "./../hooks/use-store";
import ProjectContext from "../contexts/ProjectContext";

const Home: NextPage = () => {
  const { getCurrentProjectId, getProject } = useStore();
  const { currentProject, setCurrentProject } = useContext(ProjectContext);

  const handleOnTaskAdded = (newTask: Task): void => {
    setCurrentProject((project: Project): Project => {
      project.tasks.push(newTask);
      return project;
    });
  };

  const handleOnTaskRemoved = (taskId: string): void => {
    setCurrentProject((project: Project): Project => {
      const modifiedTasks = project.tasks.filter(({ id }) => id !== taskId);
      return { ...project, tasks: modifiedTasks };
    });
  };

  // Initialize project grid if currentProjectId exists in store
  useEffect(() => {
    const currentProjectId = getCurrentProjectId();

    // TODO: set error handler if currentPorjectId exists but project doesn't
    // TODO: set logic error handler; if currentPorjectId doesn't exists, then set the first item in projects list to currentProjectId.
    if (currentProjectId) {
      setCurrentProject(getProject(currentProjectId));
    }
  }, []);

  return (
    <>
      <Grid className="flex gap-20">
        {currentProject && (
          <Panel
            title="Backlogs"
            className="bg-red-100"
            projectId={currentProject.id}
            tasks={currentProject.tasks}
            canAddCard
            onTaskAdded={handleOnTaskAdded}
            onTaskRemoved={handleOnTaskRemoved}
          />
        )}
      </Grid>
    </>
  );
};

export default Home;
