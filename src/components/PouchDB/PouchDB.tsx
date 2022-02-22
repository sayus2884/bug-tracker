import React from "react";

// const PouchDB = require("pouchdb-browser");
import PouchDB from "pouchdb-browser";
import PouchDBFind from "pouchdb-find";

import { DatabaseContext } from "../../contexts/DatabaseContext";

const Pouch: React.FC = ({ children }) => {
  PouchDB.plugin(PouchDBFind);

  const projectsDb: PouchDB.Database = new PouchDB("projects");
  const tasksDb: PouchDB.Database = new PouchDB("tasks");
  const panelsDb: PouchDB.Database = new PouchDB("panels");

  projectsDb
    .createIndex({
      index: { fields: ["_id"], ddoc: "project-index-ddoc" },
    })
    .then((res) => {
      console.log(res);
    });

  tasksDb.createIndex({
    index: { fields: ["project_id"], ddoc: "project-id-index-ddoc" },
  });

  panelsDb.createIndex({
    index: { fields: ["project_id"], ddoc: "project-id-index-ddoc" },
  });

  return (
    <DatabaseContext.Provider value={{ projectsDb, tasksDb, panelsDb }}>
      {children}{" "}
    </DatabaseContext.Provider>
  );
};

export default Pouch;
