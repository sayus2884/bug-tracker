import { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { DragDropContext } from "react-beautiful-dnd";

import Grid from "./../components/Grid/Grid";

import useStore from "./../hooks/use-store";
import { PANEL_DEFAULT, TASK_DEFAULT } from "./../utils/defaults";
import { useProjectContext } from "../contexts/ProjectContext";
import Panel from "./../sections/Panel/Panel";

import useDatabase from "./../hooks/use-database";
import * as Types from "../utils/types";

const Home: NextPage = () => {
  const { getCurrentProjectId } = useStore();
  const { getProject, getPanels, getTasks, savePanels } = useDatabase();
  const { currentProject, setCurrentProject } = useProjectContext();
  const [panels, setPanels] = useState<Types.Panel[]>([]);
  const [tasks, setTasks] = useState<Types.Task[]>([]);

  const handleOnTaskAdded = (newTask: Types.Task) => {
    refreshPanels();
    refreshTasks();
  };

  const handleOnTaskRemoved = (): void => {
    getProject(currentProject._id).then((project) => {
      setCurrentProject(project);
    });
  };

  const handleDragEnd = (
    { destination, source, draggableId }: any,
    currentProject: Types.Project,
  ) => {
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const startPanel = panels.find((panel) => panel._id === source.droppableId);
    const finishPanel = panels.find((panel) => panel._id === destination.droppableId);
    // TODO: create helper class for array.find()
    if (!startPanel) throw new TypeError(`Panel does not exist.`);
    if (!finishPanel) throw new TypeError(`Panel does not exist.`);

    // Move tasks within the same panel
    if (startPanel._id === finishPanel._id) {
      const newTaskIds = [...startPanel.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      setCurrentProject((prevCurrentProject: Types.Project) => {
        const newPanel = {
          ...startPanel,
          taskIds: newTaskIds,
        };
        const newPanels = panels.map((panel: Types.Panel) => {
          if (panel._id === newPanel._id) {
            return newPanel;
          }
          return panel;
        });

        // save new panels to db
        setPanels(newPanels);
        savePanels(newPanels);

        // TODO: update state
        return prevCurrentProject;
      });
    } else {
      // Move tasks between panels
      const newStartTaskIds = [...startPanel.taskIds];
      newStartTaskIds.splice(source.index, 1);
      const newStartPanel: Types.Panel = {
        ...startPanel,
        taskIds: newStartTaskIds,
      };
      const newFinishTaskIds = [...finishPanel.taskIds];
      newFinishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishPanel: Types.Panel = {
        ...finishPanel,
        taskIds: newFinishTaskIds,
      };
      setCurrentProject((prevCurrentProject: Types.Project) => {
        const newPanels = panels.map((panel: Types.Panel) => {
          if (panel._id === newStartPanel._id) {
            return newStartPanel;
          }
          if (panel._id === newFinishPanel._id) {
            return newFinishPanel;
          }
          return panel;
        });

        setPanels(newPanels);
        // save new panels to db
        savePanels(newPanels);

        // TODO: update state
        return prevCurrentProject;
      });
    }
  };

  // TODO: create function/useEffect for updating current project
  const refreshPanels = async () => {
    const panels = await getPanels(currentProject._id);
    setPanels(panels);
  };

  const refreshTasks = async () => {
    const tasks = await getTasks(currentProject._id);
    setTasks(tasks);
  };

  // Initialize project grid if currentProjectId exists in store
  useEffect(() => {
    const currentProjectId = getCurrentProjectId();

    // TODO: set error handler if currentPorjectId exists but project doesn't
    // TODO: set logic error handler; if currentPorjectId doesn't exists, then set the first item in projects list to currentProjectId.
    let stateProject: Types.Project, statePanels: Types.Panel[];

    if (currentProjectId) {
      const fetchProject = async () => {
        const project = await getProject(currentProjectId);
        setCurrentProject(project);
      };

      fetchProject();
    }
  }, []);

  useEffect(() => {
    if (currentProject) {
      refreshPanels();
      refreshTasks();
    }
  }, [currentProject]);

  return (
    <>
      <Grid className="flex gap-20">
        <DragDropContext onDragEnd={(result) => handleDragEnd(result, currentProject)}>
          {currentProject &&
            currentProject.panelOrder.map((panelId, i) => {
              const panel = panels.find(({ _id }) => _id === panelId) || PANEL_DEFAULT;

              // get tasks from current project
              const panelTasks: Types.Task[] = panel.taskIds.map<Types.Task>(
                (taskId): Types.Task => {
                  const task = tasks.find((task) => task._id === taskId) || TASK_DEFAULT;

                  return task;
                },
              );

              return panel._id === PANEL_DEFAULT._id ? (
                <div key={i}></div>
              ) : (
                <Panel
                  key={panel._id}
                  projectId={currentProject._id}
                  tasks={panelTasks}
                  canAddCard={panel.title === "Backlog"}
                  panel={panel}
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
