import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import CardTask from "../../components/CardTask/CardTask";
import InputInline from "../../components/InputInline/InputInline";
import useStore, { Task } from "./../../hooks/use-store";

interface Props {
  className?: string;
  id: string;
  title?: string;
  canAddCard?: boolean;
  projectId: string;
  tasks: Task[] | [];
  onTaskAdded: (task: Task) => void;
  onTaskRemoved: (id: string) => void;
}

const Panel: React.FC<Props> = ({
  children,
  className,
  canAddCard = false,
  projectId,
  title = "Panel Name",
  tasks,
  id,

  onTaskAdded,
  onTaskRemoved,
  ...props
}) => {
  const [cardTitle, setCardTitle] = useState("");
  const { addNewTask, removeTask } = useStore();

  const handleCardTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(event.target.value);
  };

  const handleAddTaskClick = (): void => {
    const newTask = addNewTask(cardTitle, projectId, id);
    onTaskAdded(newTask);

    reset();
  };

  const handleRemoveTaskClick = (taskId: string): void => {
    removeTask(projectId, id, taskId);

    onTaskRemoved(taskId);
  };

  const reset = (): void => {
    setCardTitle("");
  };

  const isCardTitleMinChar = cardTitle.length >= 3;

  return (
    <div className={`${className} flex flex-col gap-20 p-10 min-w-[330px]`} {...props}>
      <h2 className="text-24">{title}</h2>
      {canAddCard && (
        <InputInline
          buttonText="Add"
          onChange={handleCardTitleInputChange}
          onClick={handleAddTaskClick}
          buttonDisabled={!isCardTitleMinChar}
          value={cardTitle}
        />
      )}
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex flex-col gap-10"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {tasks.map((task, i) => (
              <CardTask index={i} key={task.id} onRemoveTask={handleRemoveTaskClick} {...task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Panel;
