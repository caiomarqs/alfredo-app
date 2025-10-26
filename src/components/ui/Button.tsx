import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-[#4A90E2] text-white hover:bg-blue-600 shadow-sm',
    secondary: 'bg-[#F5D547] text-gray-800 hover:bg-yellow-400 shadow-sm',
    outline: 'bg-transparent border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-blue-50',
    ghost: 'bg-transparent text-[#4A90E2] hover:bg-blue-50'
  };
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-5 text-base font-medium',
    lg: 'py-3.5 px-6 text-lg font-medium'
  };
  return <button className={`
        flex items-center justify-center rounded-lg font-medium transition-all duration-200
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <span className="mr-2">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span> : leftIcon ? <span className="mr-2.5">{leftIcon}</span> : null}
      {children}
      {rightIcon && !isLoading && <span className="ml-2.5">{rightIcon}</span>}
    </button>;
};