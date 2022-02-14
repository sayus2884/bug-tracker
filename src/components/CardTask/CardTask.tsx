import React, { useState, useRef, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Trash } from "phosphor-react";

import Card from "./../Card/Card";
import Button from "./../Button/Button";
import DropdownOptions, {
  DropdownOption,
  DropdownOptionEvent,
} from "./../DropdownOptions/DropdownOptions";

import useStore, { Task } from "./../../hooks/use-store";
import useOutsideObserver from "./../../hooks/use-outside-observer";
import ProjectContext from "../../contexts/ProjectContext";

interface Props extends Task {
  className?: string;
  onRemoveTask: (task: string) => void;
  projectId: string;
  index: number;
}

const colorOptions: DropdownOption[] = [
  {
    value: "bg-blue-500",
    render: () => <div className="w-35 h-15 bg-blue-500 rounded"></div>,
  },
  {
    value: "bg-yellow-300",
    render: () => <div className="w-35 h-15 bg-yellow-300 rounded"></div>,
  },
  {
    value: "bg-orange-300",
    render: () => <div className="w-35 h-15 bg-orange-300 rounded"></div>,
  },
  {
    value: "bg-red-500",
    render: () => <div className="w-35 h-15 bg-red-500 rounded"></div>,
  },
];

const CardTask: React.FC<Props> = ({
  className,
  id,
  title,
  description,
  branch,
  type,
  priority,
  projectId,
  index,

  onRemoveTask,
  ...props
}) => {
  const { editTaskPriority, getProject } = useStore();
  const { setCurrentProject } = useContext(ProjectContext);
  const [isPrioritySelectionOpen, setIsPrioritySelectionOpen] = useState(false);
  const priorityContainerRef = useRef(null);

  const handleTakeTaskClick = () => {
    console.log("take task");
  };

  const handleRemoveTaskClick = () => {
    onRemoveTask(id);
  };

  const handlePriorityToggle = () => {
    setIsPrioritySelectionOpen((toggle) => !toggle);
  };

  const handlePrioritySelected = (option: DropdownOptionEvent) => {
    editTaskPriority(projectId, id, option.value);
    setCurrentProject(getProject(projectId));

    closePrioritySelector();
  };

  const closePrioritySelector = () => {
    setIsPrioritySelectionOpen(false);
  };

  useOutsideObserver(priorityContainerRef, closePrioritySelector);

  //TODO: enable button for take feature.
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Card
            className={`${className} flex flex-col bg-paper min-h-[150px] rounded overflow-hidden shadow`}>
            <div className="relative leading-[0] z-50" ref={priorityContainerRef}>
              <button
                className={`${priority} h-[12px] w-50`}
                onClick={handlePriorityToggle}></button>

              {isPrioritySelectionOpen && (
                <DropdownOptions
                  options={colorOptions}
                  className="left-0 origin-top-left"
                  onOptionSelected={handlePrioritySelected}
                />
              )}
            </div>

            <div className="relative flex flex-col px-15 pb-10 pt-20 flex-grow">
              <p className="relative flex-grow ">{title}</p>

              <div className="flex justify-between items-center">
                <p>{branch}</p>

                <Button
                  className="p-[3px] rounded text-wood opacity-50 hover:text-red-400 hover:opacity-100"
                  onClick={handleRemoveTaskClick}>
                  <Trash size={24} />
                </Button>

                {false && (
                  <Button className="bg-red-400 p-8" onClick={handleTakeTaskClick} disabled>
                    Take
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default CardTask;
