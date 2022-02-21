import React from "react";
import PouchDB from "pouchdb-browser";

import { DatabaseContext } from "../../contexts/DatabaseContext";

const Pouch: React.FC = ({ children }) => {
  const database = new PouchDB("btdb");

  database.info().then((info) => {
    console.log(`Database initialized: ${info.db_name}`);
  });

  return <DatabaseContext.Provider value={{ database }}>{children} </DatabaseContext.Provider>;
};

export default Pouch;
