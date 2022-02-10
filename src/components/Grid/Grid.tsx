import React from "react";

interface Props {
  className?: string;
}

const Grid: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={`${className} bg-red-50 h-full`} {...props}>
      {children}
    </div>
  );
};

export default Grid;
