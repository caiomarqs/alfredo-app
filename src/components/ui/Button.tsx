import React from 'react';
import { cn } from '../../utils';
import { colors, borderRadius, fontSize, fontWeight, shadows, transitions } from '../../constants';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `bg-[${colors.primary.main}] text-white hover:bg-[${colors.primary.dark}] shadow-sm`,
  secondary: `bg-[${colors.secondary.main}] text-gray-800 hover:bg-[${colors.secondary.dark}] shadow-sm`,
  outline: `bg-transparent border-2 border-[${colors.primary.main}] text-[${colors.primary.main}] hover:bg-blue-50`,
  ghost: `bg-transparent text-[${colors.primary.main}] hover:bg-blue-50`,
  danger: `bg-[${colors.error.main}] text-white hover:bg-[${colors.error.dark}] shadow-sm`,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-2.5 px-5 text-base font-medium',
  lg: 'py-3.5 px-6 text-lg font-medium',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : leftIcon ? (
          <span className="mr-2.5">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && <span className="ml-2.5">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
