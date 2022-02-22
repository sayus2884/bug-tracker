import { delBasePath } from "next/dist/shared/lib/router/router";
import { useDatabaseContext } from "../contexts/DatabaseContext";
import { generateId } from "../utils/helpers";
import { Panel, PanelCreate, ProjectCreate } from "../utils/types";
import { Project } from "./../utils/types";

const UseDatabase = () => {
  const { projectsDb, tasksDb, panelsDb } = useDatabaseContext();

  const generatePanel = (title: string, project_id: string): PanelCreate => {
    const _id = `${project_id}-${generateId()}`;
    return {
      _id,
      title,
      taskIds: [],
      project_id,
    };
  };

  const getProjects = async (): Promise<Project[]> => {
    console.log("get projects");
    const projects = await projectsDb.allDocs({ include_docs: true }).then((res) => {
      return res.rows.map((row) => <Project>row.doc);
    });

    return projects;
  };

  const getProject = (id: string) => {
    console.log("get project", id);
  };

  const addNewProject = async (name: string): Promise<Project> => {
    const newProjectId = generateId();

    // ! Destroy db
    // projectsDb.destroy();
    // panelsDb.destroy();

    // TODO: check if project name exists, deny creation

    // add default panels with project id as start key
    const newPanels: PanelCreate[] = [
      "Backlog",
      "Tasks",
      "Bugs",
      "In Progress",
      "Testing",
      "Done",
    ].map((title) => generatePanel(title, newProjectId));

    // create panel order
    const newPanelOrder: string[] = newPanels.map(({ _id }) => _id);

    // create new project
    const newProject: ProjectCreate = {
      _id: newProjectId,
      name,
      panelOrder: newPanelOrder,
    };

    // save project to db
    const project = await projectsDb
      .put(newProject)

      .then((res) => {
        return projectsDb.get<Project>(res.id);
      })
      .then((res) => res);

    // save panels to db
    await panelsDb
      .bulkDocs(newPanels)
      .then(() => {
        return panelsDb.find({
          selector: { project_id: { $eq: newProjectId } },
          use_index: "project-id-index-ddoc",
        });
      })
      .then((res) => <Panel[]>res.docs);

    // create Project Object Builder
    return project;
  };

  return { getProjects, getProject, addNewProject };
};

export default UseDatabase;
