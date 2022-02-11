import React from "react";
import { Task } from "./../../hooks/use-store";

interface Props {
  className?: string;
}

const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={`${className} min-h-[150px] px-15 py-10`} {...props}>
      {children}
    </div>
  );
};

export default Card;
