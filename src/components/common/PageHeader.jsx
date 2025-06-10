import React from 'react';
import Button from './Button';

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="border-b border-gray-200 pb-5 mb-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {actions && <div className="mt-3 sm:mt-0">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;