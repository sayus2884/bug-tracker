import { useState } from "react";
import { Project } from "../utils/types";

const UseProject = () => {
  const projectDefault: Project = {
    _id: "",
    name: "",
    panelOrder: [],
  };
  const [currentProject, setCurrentProject] = useState(projectDefault);

  return { currentProject, setCurrentProject };
};

export default UseProject;
