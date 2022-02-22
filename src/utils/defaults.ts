import { Panel, Task } from "./types";

export const PANEL_DEFAULT: Panel = {
  _id: "",
  title: "",
  taskIds: [],
  project_id: "",
};

export const TASK_DEFAULT: Task = {
  _id: "",
  title: "",
  description: "",
  branch: "",
  type: "",
  priority: "",
  project_id: "",
};
