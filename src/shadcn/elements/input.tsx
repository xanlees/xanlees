import * as React from "react";
import { cn, handleInputChange } from "../lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: 'currency' | string;
  numericOnly?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, numericOnly, ...props }, ref) => {
    return (
      <input
        type={type === 'currency' ? 'text' : (type || 'text')}
        className={cn(
          "flex  my-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={(event) => handleInputChange(event, !!numericOnly, type, onChange)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
