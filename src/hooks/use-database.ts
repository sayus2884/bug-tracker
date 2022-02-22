import { delBasePath } from "next/dist/shared/lib/router/router";
import { useDatabaseContext } from "../contexts/DatabaseContext";
import { generateId } from "../utils/helpers";
import { Project, Panel, PanelCreate, ProjectCreate, Task } from "../utils/types";

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
    const projects = await projectsDb.allDocs({ include_docs: true }).then((res) => {
      return res.rows.map((row) => <Project>row.doc);
    });

    return projects;
  };

  const getProject = async (_id: string) => {
    const project = await projectsDb
      .find({ selector: { _id } })
      .then((project) => <Project>project.docs[0]);

    return project;
  };

  const addNewProject = async (name: string): Promise<Project> => {
    const newProjectId = generateId();

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

  const saveProject = async (project: Project): Promise<PouchDB.Core.Response> => {
    return projectsDb.put(project);
  };

  const getPanels = async (project_id: string): Promise<Panel[]> => {
    const panels = await panelsDb
      .find({ selector: { project_id } })
      .then((res) => <Panel[]>res.docs);

    return panels;
  };

  const getTasks = async (project_id: string): Promise<Task[]> => {
    const tasks = await tasksDb.find({ selector: { project_id } }).then((res) => <Task[]>res.docs);

    return tasks;
  };

  const addNewTask = (title: string, project_id: string, panel_id: string) => {
    const taskId = generateId();
    const newTask: Task = {
      _id: taskId,
      title,
      description: "",
      branch: "",
      type: "",
      priority: "bg-blue-500",
      project_id,
    };

    // update panel
    return (
      panelsDb
        .get<Panel>(panel_id)
        .then((panel: Panel) => {
          const taskIds = Array.from(panel.taskIds);
          taskIds.push(taskId);

          // add taskId to panel.taskIds
          return panelsDb.put({
            ...panel,
            taskIds,
          });
        })

        // add task
        .then(() => tasksDb.put(newTask))
    );
  };

  return { getProjects, getProject, addNewProject, saveProject, getPanels, getTasks, addNewTask };
};

export default UseDatabase;
