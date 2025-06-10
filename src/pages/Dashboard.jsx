import React from 'react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import Stats from '../components/dashboard/Stats';
import LeaveCalendar from '../components/dashboard/LeaveCalendar';
import RecentActivity from '../components/dashboard/RecentActivity';
import Card from '../components/common/Card';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  const currentDate = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const getWelcomeMessage = () => {
    const hour = now.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (!user) return null;

  return (
    <>
      <PageHeader 
        title={`${getWelcomeMessage()}, ${user.name.split(' ')[0]}`}
        subtitle={currentDate}
      />

      {/* Role-based stats */}
      <Stats userRole={user.role} className="mb-6" />

      {/* Dynamic dashboard content based on role */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Leave Calendar (visible to all roles) */}
          <LeaveCalendar className="mb-6" />
          
          {/* Recent Activity */}
          <RecentActivity />
        </div>

        <div className="space-y-6">
          {/* Time Clock (for employees) */}
          {(user.role === 'employee' || user.role === 'manager') && (
            <Card title="Time Clock" className="relative">
              <div className="flex items-center justify-center mb-4">
                <Clock size={36} className="text-indigo-500" />
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold">{currentTime}</div>
                <div className="text-gray-500 text-sm">{currentDate}</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="primary" fullWidth>
                  Check In
                </Button>
                <Button variant="outline" fullWidth>
                  Check Out
                </Button>
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-3">
              {user.role === 'admin' || user.role === 'hr' ? (
                <>
                  <Button variant="outline" fullWidth>
                    Add New Employee
                  </Button>
                  <Button variant="outline" fullWidth>
                    Run Payroll
                  </Button>
                  <Button variant="outline" fullWidth>
                    View Reports
                  </Button>
                </>
              ) : user.role === 'manager' ? (
                <>
                  <Button variant="outline" fullWidth>
                    View Team
                  </Button>
                  <Button variant="outline" fullWidth>
                    Approve Requests
                  </Button>
                  <Button variant="outline" fullWidth>
                    Schedule Meeting
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" fullWidth>
                    Request Leave
                  </Button>
                  <Button variant="outline" fullWidth>
                    View Payslips
                  </Button>
                  <Button variant="outline" fullWidth>
                    Update Profile
                  </Button>
                </>
              )}
            </div>
          </Card>

          {/* Birthdays & Anniversaries */}
          <Card title="Upcoming Events">
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex items-center">
                <Avatar 
                  src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=150"
                  size="sm"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">Mike Manager</p>
                  <p className="text-xs text-gray-500">Birthday on July 15</p>
                </div>
              </li>
              <li className="py-3 flex items-center">
                <Avatar 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
                  size="sm"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">Emily Employee</p>
                  <p className="text-xs text-gray-500">1 Year Anniversary on July 20</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;