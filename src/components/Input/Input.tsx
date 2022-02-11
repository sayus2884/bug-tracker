import React from "react";

interface Props {
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number | readonly string[];
}

const Input: React.FC<Props> = ({ className, onChange, value, ...props }) => {
  return <input className={`${className} w-full`} onChange={onChange} value={value} {...props} />;
};

export default Input;
