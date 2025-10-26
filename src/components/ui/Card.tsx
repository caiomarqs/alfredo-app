import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick
}) => {
  return <div className={`bg-white rounded-lg shadow-md border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>;
};
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action
}) => {
  return <div className="flex justify-between items-start p-5 border-b border-gray-100">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>;
};
export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = ''
}) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};
export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = ''
}) => {
  return <div className={`p-5 border-t border-gray-100 ${className}`}>
      {children}
    </div>;
};