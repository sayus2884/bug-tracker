import UIDGenerator from "uid-generator";
import Cookies from "js-cookie";

const UseStore = () => {
  const setCurrentProjectId = (id: string): void => {
    Cookies.set("currentProjectId", id);
  };

  const getCurrentProjectId = (): string | undefined => {
    return Cookies.get("currentProjectId");
  };

  return {
    setCurrentProjectId,
    getCurrentProjectId,
  };
};

export default UseStore;
