import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text-light)]/80">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={`w-full px-3 py-2.5 rounded-lg border bg-white/50 transition-all duration-200 focus:outline-none focus:ring-4 focus:border-[var(--color-primary)] placeholder:text-slate-400 text-sm shadow-sm
              ${error 
                ? 'border-red-500 focus:ring-red-500/20' 
                : 'border-[var(--color-border-light)] focus:ring-[var(--color-primary)]/20 hover:border-slate-400'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p className={`text-xs ${error ? 'text-red-500' : 'text-slate-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
