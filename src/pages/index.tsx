import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { DragDropContext } from "react-beautiful-dnd";

import Grid from "./../components/Grid/Grid";

import useStore, { Project, Task } from "./../hooks/use-store";
import ProjectContext from "../contexts/ProjectContext";
import Panel from "./../sections/Panel/Panel";

const Home: NextPage = () => {
  const { getCurrentProjectId, getProject, saveProject } = useStore();
  const { currentProject, setCurrentProject } = useContext(ProjectContext);

  const handleOnTaskAdded = (): void => {
    setCurrentProject((currentProject: Project): Project => {
      return getProject(currentProject.id);
    });
  };

  const handleOnTaskRemoved = (): void => {
    setCurrentProject((currentProject: Project): Project => {
      return getProject(currentProject.id);
    });
  };

  const handleDragEnd = ({ destination, source, draggableId }: any, currentProject: Project) => {
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const panel = currentProject.panels.find((panel) => panel.id === source.droppableId);
    const newTaskIds = [...(panel?.taskIds || [])];
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    setCurrentProject((prevCurrentProject: any) => {
      const newPanel = {
        ...panel,
        taskIds: newTaskIds,
      };

      const newPanels = prevCurrentProject.panels.map((panel: any) => {
        if (panel.id === newPanel.id) {
          return newPanel;
        }
        return panel;
      });

      const newCurrentProject = {
        ...prevCurrentProject,
        panels: newPanels,
      };

      // Save current project to store
      saveProject(newCurrentProject);

      return newCurrentProject;
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
        <DragDropContext onDragEnd={(result) => handleDragEnd(result, currentProject)}>
          {currentProject &&
            currentProject.panels.map(({ title, id, taskIds }) => {
              // TODO: Map out the panelOrder instead of the panel directly.

              // get tasks from current project
              const tasks: Task[] = taskIds.map<Task>((taskId): Task => {
                let task = currentProject.tasks.find((task) => task.id === taskId);

                if (!task)
                  // ! if Task does not exist, remove taskId from panel's taskIds
                  throw new TypeError(`Task with taskId ${taskId} does not exist.`);

                return task;
              });

              return (
                <Panel
                  key={id}
                  id={id}
                  title={title}
                  className="bg-red-100"
                  projectId={currentProject.id}
                  tasks={tasks}
                  canAddCard={title === "Backlog"}
                  onTaskAdded={handleOnTaskAdded}
                  onTaskRemoved={handleOnTaskRemoved}
                />
              );
            })}
        </DragDropContext>
      </Grid>
    </>
  );
};

export default Home;
