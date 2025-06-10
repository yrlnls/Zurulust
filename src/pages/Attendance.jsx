import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Calendar, Clock, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { attendance, employees } from '../data/mockData';

const Attendance = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Format date for display
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const today = new Date();
  const isToday = currentDate.toDateString() === today.toDateString();
  
  // Get current time for check-in clock
  const currentTime = today.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Navigation functions
  const goToPreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get employee name by ID
  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };

  // Filter attendance records for the current date
  const filterAttendanceByDate = () => {
    const dateString = currentDate.toISOString().split('T')[0];
    return attendance.filter((record) => record.date === dateString);
  };

  const filteredAttendance = filterAttendanceByDate();

  // Status colors for badge
  const statusColors = {
    present: 'success',
    absent: 'danger',
    late: 'warning',
    'half-day': 'info',
  };

  return (
    <>
      <PageHeader 
        title="Attendance"
        subtitle="Track and manage employee attendance"
        actions={
          user?.role === 'admin' || user?.role === 'hr' ? (
            <Button 
              variant="outline" 
              icon={<Download size={16} />}
            >
              Export Data
            </Button>
          ) : null
        }
      />

      {/* Date navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={goToPreviousDay}
            className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={goToToday}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Today
          </button>
          <button
            type="button"
            onClick={goToNextDay}
            className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="text-gray-700 font-medium flex items-center">
          <Calendar size={18} className="mr-2" />
          {formattedDate}
        </div>
      </div>

      {/* Time Clock (for employee only) */}
      {user?.role === 'employee' && isToday && (
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Clock size={36} className="text-indigo-500 mr-4" />
              <div>
                <div className="text-2xl font-bold">{currentTime}</div>
                <div className="text-sm text-gray-500">{formattedDate}</div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="primary">Check In</Button>
              <Button variant="outline">Check Out</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Attendance Records Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getEmployeeName(record.employeeId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={statusColors[record.status]}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.checkIn || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.checkOut || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.notes || '—'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No attendance records for this day.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default Attendance;