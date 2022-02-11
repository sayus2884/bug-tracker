import React, { useState } from "react";
import Button from "../Button/Button";
import Input from "./../Input/Input";

interface Props {
  className?: string;
  buttonText?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number | readonly string[];
  buttonDisabled?: boolean;
  inputDisabled?: boolean;
}

const InputInline: React.FC<Props> = ({
  className,
  buttonText,
  onClick,
  onChange,
  value,
  inputDisabled,
  buttonDisabled,
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
        disabled={inputDisabled}
        {...props}
      />
      <Button className="px-3 py-2 bg-red-300" onClick={onClick} disabled={buttonDisabled}>
        {buttonText}
      </Button>
    </div>
  );
};

export default InputInline;
