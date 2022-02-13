import UIDGenerator from "uid-generator";
import Cookies from "js-cookie";

const uidgen = new UIDGenerator(64);

export interface Task {
  id: string;
  title: string;
  description: string;
  branch: string;
  type: string;
  priority: number;
}

export interface Panel {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  panels: Panel[];
  panelOrder: string[];
}

const UseStore = () => {
  const generateId = (): string => uidgen.generateSync();
  const generatePanel = (title: string): Panel => {
    const id = generateId();
    return {
      id,
      title,
      taskIds: [],
    };
  };

  const setCurrentProjectId = (id: string): void => {
    Cookies.set("currentProjectId", id);
  };

  const getCurrentProjectId = (): string | undefined => {
    return Cookies.get("currentProjectId");
  };

  const getProjects = (): Project[] => {
    const projectsStr = Cookies.get("projects") || "[]";
    const projects: Project[] = JSON.parse(projectsStr);
    return projects;
  };

  const getProject = (id: string): Project => {
    const projectsStr = Cookies.get("projects") || "[]";
    const projects = JSON.parse(projectsStr);
    const project = projects.find((project: Project) => project.id === id);

    return project;
  };

  const addNewProject = (name: string): Project => {
    const projectsStr = Cookies.get("projects") || "[]";
    const newProjects: Project[] = JSON.parse(projectsStr);

    const newPanels: Panel[] = ["Backlog", "Tasks", "Bugs", "In Progress", "Testing", "Done"].map(
      (title) => generatePanel(title),
    );
    const newPanelOrder: string[] = newPanels.map(({ id }) => id);

    const newProject: Project = {
      id: generateId(),
      name,
      tasks: [],
      panels: newPanels,
      panelOrder: newPanelOrder,
    };

    newProjects.push(newProject);

    Cookies.set("projects", JSON.stringify(newProjects));

    return newProject;
  };

  const saveProject = (newProject: Project): void => {
    const newProjects: Project[] = getProjects().map((project) => {
      return project.id === newProject.id ? newProject : project;
    });

    Cookies.set("projects", JSON.stringify(newProjects));
  };

  const addNewTask = (title: string, projectId: string, panelId: string): Task => {
    const taskId = generateId();
    const newTask: Task = {
      id: taskId,
      title,
      description: "",
      branch: "",
      type: "",
      priority: 0,
    };

    // Create new array of modified projects
    const modifiedProjects = getProjects().map((project) => {
      if (project.id !== projectId) {
        return project;
      }

      // Add task
      const newTasks = project.tasks;
      newTasks.push(newTask);

      // Add taskId to panel
      const panels = project.panels.map((panel) => {
        if (panel.id === panelId) {
          panel.taskIds.push(taskId);
        }

        return panel;
      });

      const newProject = {
        ...project,
        panels,
      };

      return newProject;
    });

    Cookies.set("projects", JSON.stringify(modifiedProjects));

    return newTask;
  };

  const removeTask = (projectId: string, panelId: string, taskId: string): void => {
    const modifiedProjects = getProjects().map((project) => {
      if (project.id !== projectId) {
        return project;
      }

      // remove task from tasks array
      const modifiedTasks = project.tasks.filter(({ id }) => id !== taskId);

      // remove taskId from panel
      const panels = project.panels.map((panel) => {
        if (panel.id === panelId) {
          panel.taskIds = panel.taskIds.filter((id) => id !== taskId);
        }

        return panel;
      });

      const newProject = { ...project, tasks: modifiedTasks, panels };

      return newProject;
    });

    Cookies.set("projects", JSON.stringify(modifiedProjects));
  };

  return {
    setCurrentProjectId,
    getCurrentProjectId,
    addNewTask,
    removeTask,
    getProjects,
    getProject,
    addNewProject,
    saveProject,
    generateId,
  };
};

export default UseStore;
