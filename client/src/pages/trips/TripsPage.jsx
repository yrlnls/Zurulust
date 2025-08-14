import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const LeaveCalendar = ({ className = '' }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Mock leave data
  const leaveEvents = [
    {
      id: '1',
      employeeId: 'emp3',
      employeeName: 'Emily Employee',
      type: 'sick',
      startDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 8),
      endDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 8),
    },
    {
      id: '2',
      employeeId: 'emp3',
      employeeName: 'Emily Employee',
      type: 'vacation',
      startDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 15),
      endDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 20),
    },
    {
      id: '3',
      employeeId: 'emp2',
      employeeName: 'Mike Manager',
      type: 'vacation',
      startDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 22),
      endDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 26),
    },
  ];

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = () => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const startDay = startDayOfMonth();

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14 border border-gray-100"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      
      // Find leave events for this day
      const dayEvents = leaveEvents.filter(event => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        return date >= start && date <= end;
      });

      days.push(
        <div key={day} className="min-h-14 h-auto border border-gray-100 p-1">
          <div className="flex flex-col h-full">
            <div className="text-xs font-medium mb-1">{day}</div>
            <div className="flex flex-col gap-1">
              {dayEvents.map(event => (
                <div key={event.id} className="text-xs truncate">
                  <Badge
                    variant={event.type === 'vacation' ? 'primary' : event.type === 'sick' ? 'danger' : 'warning'}
                    className="text-xs"
                  >
                    {event.employeeName}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card title="Leave Calendar" className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px">
        {weekdays.map(day => (
          <div key={day} className="text-xs font-medium text-gray-500 p-2 text-center">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
      
      <div className="mt-4 flex space-x-4">
        <div className="flex items-center">
          <Badge variant="primary" className="mr-1" />
          <span className="text-xs text-gray-500">Vacation</span>
        </div>
        <div className="flex items-center">
          <Badge variant="danger" className="mr-1" />
          <span className="text-xs text-gray-500">Sick</span>
        </div>
        <div className="flex items-center">
          <Badge variant="warning" className="mr-1" />
          <span className="text-xs text-gray-500">Other</span>
        </div>
      </div>
    </Card>
  );
};

export default LeaveCalendar;