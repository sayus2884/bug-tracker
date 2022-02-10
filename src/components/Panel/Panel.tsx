import React from "react";

interface Props {
  className?: string;
  title?: string;
}

const Panel: React.FC<Props> = ({ children, title = "Panel Name", className, ...props }) => {
  return (
    <div className={`${className} flex flex-col gap-20 p-10 min-w-[350px]`} {...props}>
      <h2>{title}</h2>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
};

export default Panel;
