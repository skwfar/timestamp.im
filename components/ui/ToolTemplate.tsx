import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ToolTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const ToolTemplate: React.FC<ToolTemplateProps> = ({ 
  title, 
  description, 
  children, 
  className = "container mx-auto p-4 lg:w-1/2 xl:w-1/2" 
}) => {
  return (
    <div className={className}>
      <h1 className="text-2xl font-bold my-6">{title}</h1>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      {children}
    </div>
  );
};

export default ToolTemplate;