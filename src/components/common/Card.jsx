import React from 'react';

const Card = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {subtitle && <div className="text-sm text-gray-500 mb-2">{subtitle}</div>}
      {children}
    </div>
  );
};

export default Card;