import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#111] rounded-xl border border-[#222] hover:border-[#333] transition-colors",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export default Card;

