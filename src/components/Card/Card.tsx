import React, { forwardRef } from "react";

interface Props {
  className?: string;
}

const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={`${className} px-15 py-10`} {...props}>
      {children}
    </div>
  );
};
export default Card;
