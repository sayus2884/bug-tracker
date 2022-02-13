import { createContext, Dispatch, SetStateAction } from "react";
import { Project } from "../hooks/use-store";

export interface ProjectContextInterface {
  currentProject: Project;
  setCurrentProject: any;
}

const ProjectContext = createContext<ProjectContextInterface>({
  currentProject: {
    id: "",
    name: "",
    tasks: [],
    panels: [],
    panelOrder: [],
  },
  setCurrentProject: () => {},
});

export default ProjectContext;
