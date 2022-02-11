import React from "react";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<Props> = ({ children, className, type, onClick, ...props }) => {
  return (
    <button className={`${className} `} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
