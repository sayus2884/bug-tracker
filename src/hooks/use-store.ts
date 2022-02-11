import { useEffect } from "react";
import Cookies from "js-cookie";

interface Project {
  name: string;
}

const UseStore = () => {
  const getProjects = (): Project[] => {
    const projectsStr = Cookies.get("projects") || "[]";
    const projects = JSON.parse(projectsStr);
    return projects;
  };

  const addNewProject = (name: string): void => {
    const projectsStr = Cookies.get("projects") || "[]";
    const newProjects: Project[] = JSON.parse(projectsStr);
    newProjects.push({ name });

    Cookies.set("projects", JSON.stringify(newProjects));
  };

  return { getProjects, addNewProject };
};

export default UseStore;
