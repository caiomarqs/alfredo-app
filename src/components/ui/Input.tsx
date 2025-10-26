import React, { forwardRef } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  return <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>}
        <div className="relative">
          {leftIcon && <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>}
          <input ref={ref} className={`
              w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-gray-900 
              focus:border-[#4A90E2] focus:outline-none focus:ring-0
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? 'border-red-500' : ''}
              ${className}
            `} {...props} />
          {rightIcon && <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500">
              {rightIcon}
            </div>}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>;
});
Input.displayName = 'Input';