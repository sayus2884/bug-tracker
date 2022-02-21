import React, { forwardRef, useEffect } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
}

const Textarea = forwardRef(
  ({ className, ...props }: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <textarea
        className={`${className} border focus:ring-none focus:border-none focus:outline-1 focus:outline-wood/80 p-8`}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Textarea;
