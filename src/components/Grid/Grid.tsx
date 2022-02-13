import React from "react";

interface Props {
  className?: string;
}

const Grid: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={`${className} h-full`} {...props}>
      {children}
    </div>
  );
};

export default Grid;
