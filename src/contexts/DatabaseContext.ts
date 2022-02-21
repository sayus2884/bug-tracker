import { createCtx } from "../utils/helpers";
import PouchDB from "pouchdb-browser";

interface DatabaseContextInterface {
  database: PouchDB.Database;
}

const [useDatabaseContext, DatabaseContext] = createCtx<DatabaseContextInterface>();

export { useDatabaseContext, DatabaseContext };
