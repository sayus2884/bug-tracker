import React from "react";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ children, className, type, onClick, disabled, ...props }) => {
  return (
    <button
      className={`${className} disabled:opacity-50`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
