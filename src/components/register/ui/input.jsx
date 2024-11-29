import { forwardRef } from 'react';

export const FormInput = forwardRef(({ label, error, icon, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>  
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            block w-full rounded-md border
            ${icon ? 'pl-10' : 'pl-3'}
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }
            shadow-sm py-2 sm:text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>
      )}
    </div>
  );
});