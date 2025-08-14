import React from 'react';

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  initials,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  // Extract initials from alt text if not provided
  const displayInitials = initials || (alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase());

  return (
    <div className={`relative rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium text-gray-600">{displayInitials}</span>
      )}
    </div>
  );
};

export default Avatar;
