import React, { forwardRef } from 'react';

const Select = forwardRef((
  { 
    label, 
    options, 
    helperText, 
    error, 
    fullWidth = false, 
    className = '', 
    onChange,
    ...props 
  }, 
  ref
) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <select
        ref={ref}
        className={`
          block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
          ${error ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : ''}
          ${props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''}
        `}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {(helperText || error) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
