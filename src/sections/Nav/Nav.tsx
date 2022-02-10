import React from "react";

interface Props {
  className?: string;
}

const Nav: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className="flex gap-25 h-full items-center">
        <div>logo</div>
        <div>project dropdown</div>
      </div>
    </div>
  );
};

export default Nav;
