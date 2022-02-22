import { createCtx } from "../utils/helpers";
import { Project } from "../utils/types";
export interface ProjectContextInterface {
  currentProject: Project;
  setCurrentProject: any;
}

const [useProjectContext, ProjectContext] = createCtx<ProjectContextInterface>();

export { useProjectContext, ProjectContext };
