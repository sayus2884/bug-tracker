import React, { useState, useRef, useContext } from "react";
import { CaretDown, Plus } from "phosphor-react";

import Input from "./../../components/Input/Input";

import useOutsideObserver from "./../../hooks/use-outside-observer";
import useStore from "./../../hooks/use-store";
import ProjectContext from "./../../contexts/ProjectContext";

interface Props {
  className?: string;
}

const ProjectSelector: React.FC<Props> = ({ className, ...props }) => {
  const { setCurrentProject } = useContext(ProjectContext);

  const { setCurrentProjectId, getProjects, getProject, addNewProject } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionName, setSelectedOptionName] = useState(
    getProjects().length > 0 ? getProjects()[0].name : "",
  );
  const [options, setOptions] = useState(getProjects());
  const containerRef = useRef(null);

  const handleOptionSelected = (id: string, name: string): void => {
    setSelectedOptionName(name);
    setCurrentProject(getProject(id));
    setCurrentProjectId(id);

    close();
  };

  const handleAddProject = (): void => {
    if (options.some(({ name }) => name === selectedOptionName)) {
      return;
    }

    const newProject = addNewProject(selectedOptionName);
    setCurrentProject(newProject);
    setCurrentProjectId(newProject.id);
    setOptions(getProjects());

    close();
  };

  const handleProjectInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOptionName(event.target.value);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  const open = (): void => {
    setIsOpen(true);
  };

  const isOptionsAvailable = options.length > 0;
  const isSelectedOptionNameAvailable =
    selectedOptionName.length > 3 && !options.some(({ name }) => name === selectedOptionName);

  useOutsideObserver(containerRef, () => close());

  return (
    <div className="relative inline-block text-left w-300" ref={containerRef}>
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
          value={selectedOptionName}
        />

        {(isOpen || !isOptionsAvailable) && (
          <button
            className="hover:bg-red-100 px-4 py-1 disabled:opacity-50"
            onClick={handleAddProject}
            disabled={!isSelectedOptionNameAvailable}>
            <Plus size={20} weight="bold" />
          </button>
        )}

        {!isOpen && isOptionsAvailable && (
          <button className="hover:bg-red-100 px-4 py-1" onClick={open}>
            <CaretDown size={20} weight="bold" />
          </button>
        )}
      </div>

      {isOpen && isOptionsAvailable && (
        <div
          className="origin-top-right absolute right-0 w-300 rounded-b shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button">
          <div className="py-1" role="none">
            {options.map(({ id, name }, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelected(id, name)}
                className="text-gray-700 block px-4 py-2 text-sm text-left w-full hover:bg-red-100">
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
