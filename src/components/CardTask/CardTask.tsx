import React from "react";
import Card from "./../Card/Card";
import Button from "./../Button/Button";

interface Props {
  className?: string;
}

const CardTask: React.FC<Props> = ({ className, ...props }) => {
  const handleTakeTaskClick = () => {
    console.log("take task");
  };

  return (
    <Card className="relative flex flex-col bg-red-300 rounded overflow-hidden">
      <div>
        <div className="absolute bg-blue-500 h-10 w-50 top-0 left-0"></div>
      </div>
      <p className="relative top-10 h-full">card description</p>

      <div className="flex justify-between items-center">
        <p>branch name</p>
        <Button className="bg-red-400 p-8" onClick={handleTakeTaskClick} disabled>
          Take
        </Button>
      </div>
    </Card>
  );
};

export default CardTask;
