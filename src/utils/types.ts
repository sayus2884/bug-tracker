export interface Task {
  _id: string;
  _rev?: string;
  title: string;
  description: string;
  branch: string;
  type: string;
  priority: string;
  project_id: string;
}

export interface TaskCreate extends Task {}

export interface Panel {
  _id: string;
  _rev?: string;
  title: string;
  taskIds: string[];
  project_id: string;
}

export interface PanelCreate extends Panel {}
export interface Project {
  _id: string;
  _rev?: string;
  name: string;
  panelOrder: string[];
}

export interface ProjectCreate extends Omit<Project, "tasks" | "panels"> {}

export interface Option {
  name: string;
  value: string;
}
