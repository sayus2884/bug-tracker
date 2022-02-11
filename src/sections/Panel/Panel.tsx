import React, { useState } from "react";
import CardTask from "../../components/CardTask/CardTask";
import InputInline from "../../components/InputInline/InputInline";
import { Task } from "./../../hooks/use-store";

interface Props {
  className?: string;
  title?: string;
  canAddCard?: boolean;
  tasks: Task[];
}

const Panel: React.FC<Props> = ({
  children,
  className,
  canAddCard = false,
  title = "Panel Name",
  tasks,
  ...props
}) => {
  const [cardTitle, setCardTitle] = useState("");

  const handleCardTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(event.target.value);
  };

  const handleAddCardClick = (): void => {
    reset();
  };

  const reset = (): void => {
    setCardTitle("");
  };

  return (
    <div className={`${className} flex flex-col gap-20 p-10 min-w-[330px]`} {...props}>
      <h2 className="text-24">{title}</h2>
      {canAddCard && (
        <InputInline
          buttonText="Add"
          onChange={handleCardTitleInputChange}
          onClick={handleAddCardClick}
          value={cardTitle}
        />
      )}
      <div className="flex flex-col gap-10">
        {tasks.map(({ description, branch, type, priority }, i) => (
          <CardTask
            key={i}
            className="bg-red-200"
            description={description}
            branch={branch}
            type={type}
            priority={priority}
          />
        ))}
      </div>
    </div>
  );
};

export default Panel;
