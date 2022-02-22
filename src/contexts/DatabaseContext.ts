import { createCtx } from "../utils/helpers";

interface DatabaseContextInterface {
  projectsDb: PouchDB.Database;
  tasksDb: PouchDB.Database;
  panelsDb: PouchDB.Database;
}

const [useDatabaseContext, DatabaseContext] = createCtx<DatabaseContextInterface>();

export { useDatabaseContext, DatabaseContext };
