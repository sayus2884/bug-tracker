import React from "react";
import { Trash } from "phosphor-react";

import Card from "./../Card/Card";
import Button from "./../Button/Button";

import { Task } from "./../../hooks/use-store";

interface Props extends Task {
  className?: string;
  onRemoveTask: (task: string) => void;
}

const CardTask: React.FC<Props> = ({
  className,
  id,
  description,
  branch,
  type,
  priority,

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
    <Card className="relative flex flex-col bg-red-300 rounded overflow-hidden">
      <div>
        <div className="absolute bg-blue-500 h-10 w-50 top-0 left-0"></div>
      </div>
      <p className="relative top-10 h-full">{description}</p>

      <div className="flex justify-between items-center">
        <p>{branch}</p>

        <Button className="bg-red-400 p-8 rounded" onClick={handleRemoveTaskClick}>
          <Trash size={20} />
        </Button>

        {false && (
          <Button className="bg-red-400 p-8" onClick={handleTakeTaskClick} disabled>
            Take
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CardTask;
