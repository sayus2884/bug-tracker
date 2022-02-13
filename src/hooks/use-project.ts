import { useState } from "react";
import { Project } from "./use-store";

const UseProject = () => {
  const projectDefault: Project = {
    id: "",
    name: "",
    tasks: [],
    panels: [],
    panelOrder: [],
  };
  const [currentProject, setCurrentProject] = useState(projectDefault);

  return { currentProject, setCurrentProject };
};

export default UseProject;
