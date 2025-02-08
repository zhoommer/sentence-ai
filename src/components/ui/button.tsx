import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "rounded-lg font-medium transition-colors focus:outline-none";
    const variantStyles = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50",
      secondary: "bg-[#222] hover:bg-[#333] text-white disabled:opacity-50",
      outline: "border border-[#333] hover:bg-[#222] text-white disabled:opacity-50",
      ghost: "hover:bg-[#222] text-white disabled:opacity-50",
    };
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button; 