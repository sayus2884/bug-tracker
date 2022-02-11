import React from "react";
import ProjectSelector from "../ProjectSelector/ProjectSelector";

interface Props {
  className?: string;
}

const Nav: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className="flex gap-25 h-full items-center">
        <div>logo</div>
        <ProjectSelector />
      </div>
    </div>
  );
};

export default Nav;
