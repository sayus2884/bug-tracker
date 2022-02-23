import { useState } from "react";
import { Project, Panel, Task } from "../utils/types";

const UseProject = () => {
  const projectDefault: Project = {
    _id: "",
    name: "",
    panelOrder: [],
  };

  const [currentProject, setCurrentProject] = useState<Project>(projectDefault);
  const [currentPanels, setCurrentPanels] = useState<Panel[]>([]);
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);

  return {
    currentProject,
    setCurrentProject,
    currentPanels,
    setCurrentPanels,
    currentTasks,
    setCurrentTasks,
  };
};

export default UseProject;
