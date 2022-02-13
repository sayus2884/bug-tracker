import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import CardTask from "../../components/CardTask/CardTask";
import InputInline from "../../components/InputInline/InputInline";
import useStore, { Task, Panel as IPanel } from "./../../hooks/use-store";

interface Props {
  className?: string;
  canAddCard?: boolean;
  projectId: string;
  tasks: Task[] | [];
  panel: IPanel;
  onTaskAdded: (task: Task) => void;
  onTaskRemoved: (id: string) => void;
}

const Panel: React.FC<Props> = ({
  children,
  className,
  canAddCard = false,
  projectId,
  tasks,
  panel,

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
    const newTask = addNewTask(cardTitle, projectId, panel.id);
    onTaskAdded(newTask);

    reset();
  };

  const handleRemoveTaskClick = (taskId: string): void => {
    removeTask(projectId, panel.id, taskId);

    onTaskRemoved(taskId);
  };

  const reset = (): void => {
    setCardTitle("");
  };

  const isCardTitleMinChar = cardTitle.length >= 3;

  return (
    <div className={`${className} flex flex-col gap-20 p-10 min-w-[330px]`} {...props}>
      <h2 className="text-24">{panel.title}</h2>
      {canAddCard && (
        <InputInline
          buttonText="Add"
          onChange={handleCardTitleInputChange}
          onClick={handleAddTaskClick}
          buttonDisabled={!isCardTitleMinChar}
          value={cardTitle}
        />
      )}
      <Droppable droppableId={panel.id}>
        {(provided) => (
          <div
            className="flex flex-col flex-grow gap-10 min-h-[100px]"
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
