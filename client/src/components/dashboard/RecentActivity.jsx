import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import { MoreVertical } from 'lucide-react';

const RecentActivity = ({ className = '' }) => {
  // Mock activity data
  const activityItems = [
    {
      id: '1',
      user: {
        name: 'Emily Employee',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      },
      action: 'requested leave',
      target: 'August 10-15',
      date: '2024-06-12',
      time: '09:45 AM',
    },
    {
      id: '2',
      user: {
        name: 'Mike Manager',
        avatar: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=150',
      },
      action: 'approved leave for',
      target: 'Emily Employee',
      date: '2024-06-12',
      time: '10:30 AM',
    },
    {
      id: '3',
      user: {
        name: 'Sarah HR',
        avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150',
      },
      action: 'approved leave for',
      target: 'Emily Employee',
      date: '2024-06-12',
      time: '11:15 AM',
    },
    {
      id: '4',
      user: {
        name: 'John Admin',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      },
      action: 'generated payroll for',
      target: 'June 2024',
      date: '2024-06-28',
      time: '04:00 PM',
    },
    {
      id: '5',
      user: {
        name: 'Sarah HR',
        avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150',
      },
      action: 'updated profile for',
      target: 'Mike Manager',
      date: '2024-06-29',
      time: '11:30 AM',
    },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateStr === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateStr === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Card title="Recent Activity" className={className}>
      <ul className="divide-y divide-gray-200">
        {activityItems.map((item) => (
          <li key={item.id} className="py-3">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Avatar 
                  src={item.user.avatar} 
                  alt={item.user.name} 
                  size="sm" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.user.name} {item.action}{' '}
                  <span className="font-semibold">{item.target}</span>
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {formatDate(item.date)} • {item.time}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pt-3 mt-3 border-t border-gray-200">
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View all activity
        </a>
      </div>
    </Card>
  );
};

export default RecentActivity;