import React, { useState } from "react";
import CardTask from "../../components/CardTask/CardTask";
import InputInline from "../../components/InputInline/InputInline";
import useStore, { Task } from "./../../hooks/use-store";

interface Props {
  className?: string;
  title?: string;
  canAddCard?: boolean;
  projectId: string;
  tasks: Task[];
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

  onTaskAdded,
  onTaskRemoved,
  ...props
}) => {
  const [cardTitle, setCardTitle] = useState("");
  const { addNewTask, generateId, removeTask } = useStore();

  const handleCardTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(event.target.value);
  };

  const handleAddTaskClick = (): void => {
    const newTask: Task = {
      id: generateId(),
      description: cardTitle,
      branch: "",
      type: "",
      priority: 0,
    };

    addNewTask(projectId, newTask);

    onTaskAdded(newTask);

    reset();
  };

  const handleRemoveTaskClick = (taskId: string): void => {
    removeTask(projectId, taskId);

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
      <div className="flex flex-col gap-10">
        {tasks.map(({ id, description, branch, type, priority }, i) => (
          <CardTask
            key={i}
            id={id}
            className="bg-red-200"
            description={description}
            branch={branch}
            type={type}
            priority={priority}
            onRemoveTask={handleRemoveTaskClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Panel;
