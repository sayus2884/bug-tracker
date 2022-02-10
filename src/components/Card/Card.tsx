import React from "react";

interface Props {
  className?: string;
}

const Card: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={`${className} min-h-[150px] px-15 py-10`} {...props}>
      add Card stuff here
    </div>
  );
};

export default Card;
