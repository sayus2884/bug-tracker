import { createCtx } from "../utils/helpers";
import { Project, Panel, Task } from "../utils/types";

export interface ProjectContextInterface {
  currentProject: Project;
  setCurrentProject: any;
  currentPanels: Panel[];
  setCurrentPanels: any;
  currentTasks: Task[];
  setCurrentTasks: any;
}

const [useProjectContext, ProjectContext] = createCtx<ProjectContextInterface>();

export { useProjectContext, ProjectContext };
