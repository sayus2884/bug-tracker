import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { DragDropContext } from "react-beautiful-dnd";

import Grid from "./../components/Grid/Grid";

import useStore, { Project, Task, Panel as IPanel } from "./../hooks/use-store";
import ProjectContext from "../contexts/ProjectContext";
import Panel from "./../sections/Panel/Panel";

import dynamic from "next/dynamic";

const PouchDBContext = dynamic(() => import("../components/PouchDB/PouchDB"), { ssr: false });

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

    const startPanel = currentProject.panels.find((panel) => panel.id === source.droppableId);
    const finishPanel = currentProject.panels.find((panel) => panel.id === destination.droppableId);

    // TODO: create helper class for array.find()
    if (!startPanel) throw new TypeError(`Panel does not exist.`);
    if (!finishPanel) throw new TypeError(`Panel does not exist.`);

    // Move tasks within the same panel
    if (startPanel.id === finishPanel.id) {
      const newTaskIds = [...startPanel.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      setCurrentProject((prevCurrentProject: Project) => {
        const newPanel = {
          ...startPanel,
          taskIds: newTaskIds,
        };

        const newPanels = prevCurrentProject.panels.map((panel: IPanel) => {
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
    } else {
      // Move tasks between panels
      const newStartTaskIds = [...startPanel.taskIds];
      newStartTaskIds.splice(source.index, 1);
      const newStartPanel: IPanel = {
        ...startPanel,
        taskIds: newStartTaskIds,
      };

      const newFinishTaskIds = [...finishPanel.taskIds];
      newFinishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishPanel: IPanel = {
        ...finishPanel,
        taskIds: newFinishTaskIds,
      };

      setCurrentProject((prevCurrentProject: Project) => {
        const newPanels = prevCurrentProject.panels.map((panel: IPanel) => {
          if (panel.id === newStartPanel.id) {
            return newStartPanel;
          }

          if (panel.id === newFinishPanel.id) {
            return newFinishPanel;
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
    }
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
      <PouchDBContext>
        <Grid className="flex gap-20">
          <DragDropContext onDragEnd={(result) => handleDragEnd(result, currentProject)}>
            {currentProject &&
              currentProject.panelOrder.map((panelId) => {
                // TODO: create helper class for array.find()
                const panel = currentProject.panels.find(({ id }) => id === panelId);

                if (!panel)
                  // ! if Panel does not exist, remove panelId from panelOrder
                  throw new TypeError(`Panel with panelId ${panelId} does not exist.`);

                // get tasks from current project
                const tasks: Task[] = panel.taskIds.map<Task>((taskId): Task => {
                  let task = currentProject.tasks.find((task) => task.id === taskId);

                  if (!task)
                    // ! if Task does not exist, remove taskId from panel's taskIds
                    throw new TypeError(`Task with taskId ${taskId} does not exist.`);

                  return task;
                });

                return (
                  <Panel
                    key={panel.id}
                    projectId={currentProject.id}
                    tasks={tasks}
                    canAddCard={panel.title === "Backlog"}
                    panel={panel}
                    onTaskAdded={handleOnTaskAdded}
                    onTaskRemoved={handleOnTaskRemoved}
                  />
                );
              })}
          </DragDropContext>
        </Grid>
      </PouchDBContext>
    </>
  );
};

export default Home;
