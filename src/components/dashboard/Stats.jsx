import React from 'react';
import { Users, Calendar, ClipboardCheck, Clock } from 'lucide-react';
import Card from '../common/Card';

const StatCard = ({
  title,
  value,
  icon,
  change,
  color = 'indigo',
}) => {
  return (
    <Card className="h-full">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md bg-${color}-100 p-3`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-xl font-semibold text-gray-900">{value}</div>
            </dd>
            {change && (
              <dd className="flex items-center text-sm mt-1">
                <span
                  className={`${
                    change.isPositive ? 'text-green-600' : 'text-red-600'
                  } font-medium`}
                >
                  {change.isPositive ? '↑' : '↓'} {change.value}
                </span>
                <span className="text-gray-500 ml-1">from last month</span>
              </dd>
            )}
          </dl>
        </div>
      </div>
    </Card>
  );
};

const Stats = ({ className = '', userRole }) => {
  // Stats data would typically come from an API or context
  const stats = {
    totalEmployees: 42,
    activeEmployees: 40,
    onLeaveToday: 2,
    attendanceRate: '96%',
    pendingLeaveRequests: 5,
    upcomingBirthdays: 3,
    tasksCompleted: 18,
  };

  // Different stats for different roles
  const getStatsByRole = () => {
    switch (userRole) {
      case 'admin':
      case 'hr':
        return [
          {
            title: 'Total Employees',
            value: stats.totalEmployees,
            icon: <Users size={24} className="text-indigo-600" />,
            color: 'indigo',
          },
          {
            title: 'On Leave Today',
            value: stats.onLeaveToday,
            icon: <Calendar size={24} className="text-amber-600" />,
            color: 'amber',
          },
          {
            title: 'Attendance Rate',
            value: stats.attendanceRate,
            icon: <ClipboardCheck size={24} className="text-emerald-600" />,
            change: { value: '2%', isPositive: true },
            color: 'emerald',
          },
          {
            title: 'Pending Leave Requests',
            value: stats.pendingLeaveRequests,
            icon: <Clock size={24} className="text-blue-600" />,
            color: 'blue',
          },
        ];
      case 'manager':
        return [
          {
            title: 'Team Members',
            value: '8',
            icon: <Users size={24} className="text-indigo-600" />,
            color: 'indigo',
          },
          {
            title: 'On Leave Today',
            value: '1',
            icon: <Calendar size={24} className="text-amber-600" />,
            color: 'amber',
          },
          {
            title: 'Team Attendance',
            value: '98%',
            icon: <ClipboardCheck size={24} className="text-emerald-600" />,
            change: { value: '1%', isPositive: true },
            color: 'emerald',
          },
          {
            title: 'Pending Approvals',
            value: '2',
            icon: <Clock size={24} className="text-blue-600" />,
            color: 'blue',
          },
        ];
      case 'employee':
        return [
          {
            title: 'Leave Balance',
            value: '15 days',
            icon: <Calendar size={24} className="text-indigo-600" />,
            color: 'indigo',
          },
          {
            title: 'Attendance This Month',
            value: '19/20 days',
            icon: <ClipboardCheck size={24} className="text-emerald-600" />,
            color: 'emerald',
          },
          {
            title: 'Pending Requests',
            value: '1',
            icon: <Clock size={24} className="text-blue-600" />,
            color: 'blue',
          },
          {
            title: 'Upcoming Tasks',
            value: '3',
            icon: <Users size={24} className="text-amber-600" />,
            color: 'amber',
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {getStatsByRole().map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default Stats;