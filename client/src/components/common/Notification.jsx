import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

const ToastNotification = ({
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const typeStyles = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
  };

  const icons = {
    success: <CheckCircle className={iconColor.success} size={20} />,
    error: <XCircle className={iconColor.error} size={20} />,
    warning: <AlertTriangle className={iconColor.warning} size={20} />,
    info: <Info className={iconColor.info} size={20} />,
  };

  const transitionStyles = {
    entering: { opacity: 0, transform: 'translateX(20px)' },
    entered: { opacity: 1, transform: 'translateX(0)' },
    exiting: { opacity: 0, transform: 'translateX(20px)' },
    exited: { opacity: 0, transform: 'translateX(20px)' },
  };

  return (
    <Transition in={isVisible} timeout={300}>
      {(state) => (
        <div
          className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto border overflow-hidden ${typeStyles[type]}`}
          style={{
            ...transitionStyles[state],
            transition: 'all 300ms ease-in-out',
          }}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {icons[type]}
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onClose(id), 300);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

// Toast notification container
export const NotificationContainer = ({ notifications, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 z-50">
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {notifications.map((notification) => (
          <ToastNotification key={notification.id} {...notification} onClose={onClose} />
        ))}
      </div>
    </div>
  );
};

export default ToastNotification;

// If you are seeing a 404 error for this file in the browser, make sure:
// 1. The file is saved at the correct path: /home/tlen/Downloads/project/src/components/common/Notification.jsx
// 2. All imports referencing this file use the correct extension (.jsx) and path.
// 3. Your build tool (like Vite, Webpack, etc.) is configured to resolve .jsx files and the src directory is included.
// 4. There are no typos in the filename or import statements.

// Example import (should match the actual file location and extension):
// import ToastNotification from '../components/common/Notification.jsx';