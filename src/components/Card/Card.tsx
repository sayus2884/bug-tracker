import React, { forwardRef } from "react";

interface Props {
  className?: string;
}

const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};
export default Card;
