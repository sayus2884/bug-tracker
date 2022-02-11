import { createContext, Dispatch, SetStateAction } from "react";
import { Project } from "../hooks/use-store";

export interface ProjectInterface {
  currentProject?: Project;
  setCurrentProject: any;
}

const ProjectContext = createContext<ProjectInterface>({
  currentProject: undefined,
  setCurrentProject: () => {},
});

export default ProjectContext;
