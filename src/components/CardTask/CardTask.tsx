import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Trash } from "phosphor-react";

import Card from "./../Card/Card";
import Button from "./../Button/Button";

import { Task } from "./../../hooks/use-store";

interface Props extends Task {
  className?: string;
  onRemoveTask: (task: string) => void;
  index: number;
}

const CardTask: React.FC<Props> = ({
  className,
  id,
  title,
  description,
  branch,
  type,
  priority,
  index,

  onRemoveTask,
  ...props
}) => {
  const handleTakeTaskClick = () => {
    console.log("take task");
  };

  const handleRemoveTaskClick = () => {
    onRemoveTask(id);
  };

  //TODO: enable button for take feature.
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Card
            className={`${className} relative flex flex-col bg-paper min-h-[150px] rounded overflow-hidden`}>
            <div>
              <div className="absolute bg-blue-500 h-10 w-50 top-0 left-0"></div>
            </div>
            <p className="relative top-10 flex-grow ">{title}</p>

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
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default CardTask;
