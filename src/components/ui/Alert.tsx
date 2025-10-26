import React from 'react';
import { cn } from '../../utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const variantConfig = {
  info: {
    containerClass: 'bg-blue-50 border-blue-200',
    iconClass: 'text-blue-600',
    titleClass: 'text-blue-900',
    messageClass: 'text-blue-800',
    Icon: Info,
  },
  success: {
    containerClass: 'bg-green-50 border-green-200',
    iconClass: 'text-green-600',
    titleClass: 'text-green-900',
    messageClass: 'text-green-800',
    Icon: CheckCircle,
  },
  warning: {
    containerClass: 'bg-yellow-50 border-yellow-200',
    iconClass: 'text-yellow-600',
    titleClass: 'text-yellow-900',
    messageClass: 'text-yellow-800',
    Icon: AlertTriangle,
  },
  error: {
    containerClass: 'bg-red-50 border-red-200',
    iconClass: 'text-red-600',
    titleClass: 'text-red-900',
    messageClass: 'text-red-800',
    Icon: AlertCircle,
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  className,
}) => {
  const config = variantConfig[variant];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg border',
        config.containerClass,
        className
      )}
      role="alert"
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', config.iconClass)} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className={cn('font-semibold mb-1', config.titleClass)}>
            {title}
          </h3>
        )}
        <p className={cn('text-sm', config.messageClass)}>{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            'flex-shrink-0 p-1 rounded hover:bg-black hover:bg-opacity-5 transition-colors',
            config.iconClass
          )}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
