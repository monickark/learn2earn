import React, { memo } from 'react';

const LoadingSpinner = memo(function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-indigo-600 ${sizeClasses[size]}`}></div>
      {text && (
        <span className="mt-2 text-indigo-600 text-sm font-medium">{text}</span>
      )}
    </div>
  );
});

export default LoadingSpinner;
