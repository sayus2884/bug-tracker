import { useState } from "react";

const UseProject = () => {
  const [currentProject, setCurrentProject] = useState();

  return { currentProject, setCurrentProject };
};

export default UseProject;
