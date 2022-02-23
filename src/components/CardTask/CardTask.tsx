import React, { useState, useRef, useContext, useEffect, ChangeEventHandler } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Trash } from "phosphor-react";

import Card from "./../Card/Card";
import Button from "./../Button/Button";
import Textarea from "../Textarea/Textarea";

import DropdownOptions, {
  DropdownOption,
  DropdownOptionEvent,
} from "./../DropdownOptions/DropdownOptions";

import useStore from "./../../hooks/use-store";
import { Task } from "./../../utils/types";
import useOutsideObserver from "./../../hooks/use-outside-observer";
import { useProjectContext } from "../../contexts/ProjectContext";
import useDatabase from "./../../hooks/use-database";

interface Props extends Task {
  className?: string;
  onRemoveTask: (task: string) => void;
  projectId: string;
  panelId: string;
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
  _id,
  title,
  description,
  branch,
  type,
  priority,
  projectId,
  panelId,
  index,

  onRemoveTask,
  ...props
}) => {
  const { getProject } = useStore();
  const { removeTask, editTaskTitle, editTaskPriority } = useDatabase();
  const { setCurrentProject } = useProjectContext();
  const [isPrioritySelectionOpen, setIsPrioritySelectionOpen] = useState(false);
  const [titleInput, setTitleInput] = useState(title);
  const [isEditable, setIsEditable] = useState(false);
  const priorityContainerRef = useRef(null);
  const titleInputRef = useRef<HTMLTextAreaElement>(null);

  const handleTakeTaskClick = () => {
    console.log("take task");
  };

  const handleRemoveTaskClick = () => {
    removeTask(_id, panelId);
    onRemoveTask(_id);
  };

  const handlePriorityToggle = () => {
    setIsPrioritySelectionOpen((toggle) => !toggle);
  };

  const handlePrioritySelected = (option: DropdownOptionEvent) => {
    editTaskPriority(option.value, _id);
    // setCurrentProject(getProject(projectId));

    closePrioritySelector();
  };

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleInput(event.target.value);
  };

  const closePrioritySelector = () => {
    setIsPrioritySelectionOpen(false);
  };

  const handleOnTitleClick = () => {
    openEditableTitle();
  };

  const openEditableTitle = () => {
    setIsEditable(true);
  };

  const closeEditable = () => {
    setIsEditable(false);

    if (title !== titleInput) {
      editTaskTitle(titleInput, _id);
    }
  };

  useOutsideObserver(priorityContainerRef, closePrioritySelector);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.selectionStart = titleInput.length;
      titleInputRef.current.selectionEnd = titleInput.length;
    }
  }, [isEditable]);

  //TODO: enable button for take feature.
  return (
    <Draggable draggableId={_id} index={index}>
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
              {isEditable ? (
                <form className="flex-grow leading-none">
                  <Textarea
                    className="w-full"
                    value={titleInput}
                    onBlur={closeEditable}
                    onChange={handleTitleInputChange}
                    ref={titleInputRef}
                  />
                </form>
              ) : (
                <div className="flex-grow">
                  <p className="cursor-text w-fit" onClick={handleOnTitleClick}>
                    {titleInput}
                  </p>
                </div>
              )}

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
