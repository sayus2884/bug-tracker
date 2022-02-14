import React from "react";
import _ from "lodash";

export interface DropdownOption {
  value: string;
  name?: string;
  render: (value: string, name: string) => React.ReactNode;
}

export type DropdownOptionEvent = Omit<DropdownOption, "render">;

interface Props {
  className?: string;
  options: DropdownOption[];
  onOptionSelected: (option: DropdownOption) => void;
}

const DropdownOptions: React.FC<Props> = ({ className, options, onOptionSelected, ...props }) => {
  const handleOptionSelected = (option: DropdownOptionEvent | string): void => {
    let newOption: any = option;

    if (_.isString(option)) newOption = { value: option, name: option };

    onOptionSelected(newOption);
  };

  return (
    <div
      className={`${className} absolute rounded-b shadow-lg bg-white ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      {...props}>
      <div className="py-1" role="none">
        {options.map((option: DropdownOption | string, i) => {
          const hasRender = _.isObject(option) && option.render;
          if (hasRender) {
            const { render, ...optionProps } = option;
            return (
              <button
                className="text-gray-700 block px-2 py-1 text-sm text-left w-full hover:bg-red-100"
                key={i}
                onClick={() => handleOptionSelected(optionProps)}>
                {option.render(option.value, option.name || option.value)}
              </button>
            );
          }

          return (
            <button key={i} onClick={() => handleOptionSelected(option)}>
              {_.isObject(option) ? option.name || option.value : option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownOptions;
