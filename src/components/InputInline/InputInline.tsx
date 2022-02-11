import React, { useState } from "react";
import Button from "../Button/Button";
import Input from "./../Input/Input";

interface Props {
  className?: string;
  buttonText?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number | readonly string[];
  disabled?: boolean;
}

const InputInline: React.FC<Props> = ({
  className,
  buttonText,
  onClick,
  onChange,
  value,
  disabled,
  ...props
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="flex">
      <Input
        className={`${className} w-full px-2 outline-none`}
        onChange={handleInputChange}
        value={value}
        disabled={disabled}
        {...props}
      />
      <Button className="px-3 py-2 bg-red-300" onClick={onClick} disabled={disabled}>
        {buttonText}
      </Button>
    </div>
  );
};

export default InputInline;
