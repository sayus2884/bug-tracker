import Cookies from "js-cookie";

export interface Task {
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
  const getProjects = (): Project[] => {
    const projectsStr = Cookies.get("projects") || "[]";
    const projects: Project[] = JSON.parse(projectsStr);
    return projects;
  };

  //TODO: search project by id, not name
  const getProject = (name: string): Project => {
    const projectsStr = Cookies.get("projects") || "[]";
    const projects = JSON.parse(projectsStr);
    const project = projects.find((project: Project) => project.name === name);

    return project;
  };

  const addNewProject = (name: string): void => {
    const projectsStr = Cookies.get("projects") || "[]";
    const newProjects: Project[] = JSON.parse(projectsStr);
    newProjects.push({
      id: "test",
      name,
      tasks: [
        {
          description: "this is the card description",
          type: "feature",
          branch: "",
          priority: 1,
        },
      ],
    });

    Cookies.set("projects", JSON.stringify(newProjects));
  };

  return { getProjects, getProject, addNewProject };
};

export default UseStore;
