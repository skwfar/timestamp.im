import React from 'react';
import { useTranslation } from 'react-i18next';

export interface InputFieldProps {
  label: string;
  type: 'text' | 'number' | 'datetime-local';
  value: string | number | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  className?: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  min,
  max,
  className = "border p-2 w-full",
  icon
}) => {
  const displayValue = value === undefined ? "" : value;

  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1 flex items-center gap-2">
        {icon && icon}
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={displayValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`${className} ${icon ? 'pl-10' : ''}`}
        />
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;