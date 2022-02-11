import UIDGenerator from "uid-generator";
import Cookies from "js-cookie";

const uidgen = new UIDGenerator(64);

export interface Task {
  id: string;
  description: string;
  branch: string;
  type: string;
  priority: number;
}
export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

const UseStore = () => {
  const generateId = (): string => uidgen.generateSync();

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

    const newProject: Project = {
      id: generateId(),
      name,
      tasks: [],
    };

    newProjects.push(newProject);

    Cookies.set("projects", JSON.stringify(newProjects));

    return newProject;
  };

  const addNewTask = (projectId: string, task: Task): void => {
    const modifiedProjects = getProjects().map((project) => {
      if (project.id !== projectId) {
        return project;
      }

      const newTasks = project.tasks;
      newTasks.push(task);

      return project;
    });

    Cookies.set("projects", JSON.stringify(modifiedProjects));
  };

  const removeTask = (projectId: string, taskId: string): void => {
    const modifiedProjects = getProjects().map((project) => {
      if (project.id !== projectId) {
        return project;
      }

      const modifiedTasks = project.tasks.filter(({ id }) => id !== taskId);

      return { ...project, tasks: modifiedTasks };
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
    generateId,
  };
};

export default UseStore;
