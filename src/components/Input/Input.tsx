import React from "react";

interface Props {
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number | readonly string[];
  disabled?: boolean;
}

const Input: React.FC<Props> = ({ className, onChange, value, disabled, ...props }) => {
  return (
    <input
      className={`${className} w-full`}
      onChange={onChange}
      value={value}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;
