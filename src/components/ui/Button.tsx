import React, { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', isLoading, fullWidth, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white focus:ring-[var(--color-primary)] shadow-sm hover:shadow",
      secondary: "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white focus:ring-[var(--color-accent)] shadow-sm hover:shadow",
      outline: "border border-[var(--color-border-light)] bg-transparent hover:bg-black/5 text-[var(--color-text-light)] focus:ring-[var(--color-border-light)]",
      ghost: "bg-transparent hover:bg-black/5 text-[var(--color-text-light)] focus:ring-black/10",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} px-4 py-2.5 text-sm ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
