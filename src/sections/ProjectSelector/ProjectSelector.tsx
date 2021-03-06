import React, { useState, useRef, useContext, useEffect } from "react";
import { CaretDown, Plus } from "phosphor-react";

import Input from "./../../components/Input/Input";

import useOutsideObserver from "./../../hooks/use-outside-observer";
import useStore from "./../../hooks/use-store";
import useDatabase from "./../../hooks/use-database";

import { useProjectContext } from "./../../contexts/ProjectContext";
interface Props {
  className?: string;
}

// ? pass project options instead of initializing here?

const ProjectSelector: React.FC<Props> = ({ className, ...props }) => {
  const { setCurrentProject } = useProjectContext();
  const { setCurrentProjectId, getCurrentProjectId } = useStore();
  const { addNewProject, getProjects, getProject } = useDatabase();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionInput, setSelectedOptionInput] = useState("");
  const [selectedOptionName, setSelectedOptionName] = useState("");
  const [options, setOptions] = useState<{ name: string; value: string }[]>([]);
  const containerRef = useRef(null);

  const handleOptionSelected = async (projectId: string, name: string) => {
    const project = await getProject(projectId);
    setCurrentProject(project);
    setCurrentProjectId(projectId);
    setSelectedOptionInput(name);
    setSelectedOptionName(name);
    refreshOptions(projectId);

    close();
  };

  const handleAddProject = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();

    if (options.some(({ name }) => name === selectedOptionInput)) {
      return;
    }

    const project = await addNewProject(selectedOptionInput);
    setCurrentProject(project);
    refreshOptions(project._id);

    close();
  };

  const handleProjectInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOptionInput(event.target.value);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  const open = (): void => {
    setIsOpen(true);
  };

  const isOptionsAvailable = options.length > 0;
  const isSelectedOptionNameAvailable =
    selectedOptionInput.length > 3 && selectedOptionName !== selectedOptionInput;

  const refreshOptions = (currentProjectId: string | undefined) => {
    if (!currentProjectId) return;

    getProjects().then((projects) => {
      const options: { name: string; value: string }[] = projects

        // Remove currently selected project from options
        .filter(({ _id, name }) => {
          if (_id === currentProjectId) {
            setSelectedOptionInput(name);
            setSelectedOptionName(name);
            return false;
          }

          return true;
        })

        // save the rest
        .map(({ _id, name }) => {
          return { value: _id, name };
        });

      setOptions(options);
    });
  };

  useOutsideObserver(containerRef, () => close());

  // Initialize project options
  useEffect(() => {
    const currentProjectId = getCurrentProjectId();
    refreshOptions(currentProjectId || undefined);
  }, []);

  return (
    <div className="relative text-left w-300" ref={containerRef}>
      <form onSubmit={handleAddProject}>
        <div
          className={`inline-flex justify-between w-full ${
            isOpen && isOptionsAvailable ? "rounded-t" : "rounded"
          } border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 overflow-hidden`}
          aria-expanded="true"
          aria-haspopup="true">
          <Input
            className="outline:none px-4 py-2"
            onFocus={open}
            onChange={handleProjectInputChange}
            value={selectedOptionInput}
          />

          {(isOpen || !isOptionsAvailable) && (
            <button
              className="hover:bg-paper-100/60 px-4 py-1 disabled:opacity-50"
              onClick={handleAddProject}
              disabled={!isSelectedOptionNameAvailable}>
              <Plus size={20} weight="bold" />
            </button>
          )}

          {!isOpen && isOptionsAvailable && (
            <button className="hover:bg-paper-100/60 px-4 py-1" onClick={open}>
              <CaretDown size={20} weight="bold" />
            </button>
          )}
        </div>
      </form>

      {isOpen && isOptionsAvailable && (
        <div
          className="origin-top-right absolute right-0 w-300 rounded-b shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button">
          <div className="py-1" role="none">
            {options.map(({ value, name }, i) => {
              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelected(value, name)}
                  className="text-gray-700 block px-4 py-2 text-sm text-left w-full hover:bg-paper-100/60">
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
