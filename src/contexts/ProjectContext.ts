import { createContext, Dispatch, SetStateAction } from "react";
import { Project } from "../utils/types";

export interface ProjectContextInterface {
  currentProject: Project;
  setCurrentProject: any;
}

const ProjectContext = createContext<ProjectContextInterface>({
  currentProject: {
    _id: "",
    name: "",
    panelOrder: [],
  },
  setCurrentProject: () => {},
});

export default ProjectContext;
