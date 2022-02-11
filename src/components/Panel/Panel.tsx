import React, { useState } from "react";
import InputInline from "./../InputInline/InputInline";

interface Props {
  className?: string;
  title?: string;
  canAddCard?: boolean;
}

const Panel: React.FC<Props> = ({
  children,
  canAddCard = false,
  title = "Panel Name",
  className,
  ...props
}) => {
  const [cardTitle, setCardTitle] = useState("");

  const handleCardTitleInputChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCardTitle(event.target.value);
  };

  const handleAddCardClick: React.MouseEventHandler = () => {
    console.log("Add new Card");
  };

  return (
    <div className={`${className} flex flex-col gap-20 p-10 min-w-[330px]`} {...props}>
      <h2>{title}</h2>
      {canAddCard && (
        <InputInline
          buttonText="Add"
          onChange={handleCardTitleInputChange}
          onClick={handleAddCardClick}
        />
      )}
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
};

export default Panel;
