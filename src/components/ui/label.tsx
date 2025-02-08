import { LabelHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("text-sm font-medium text-zinc-400 mb-1.5 block", className)}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export default Label; 