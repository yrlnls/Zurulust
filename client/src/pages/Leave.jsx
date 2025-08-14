import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { leaveRequests, leaveBalances, employees } from '../data/mockData';
import { Plus, Filter, Calendar, User, Clock } from 'lucide-react';

const Leave = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('requests');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter leave requests based on user role and selected filter
  const getFilteredLeaveRequests = () => {
    let filtered = [...leaveRequests];
    
    // Filter by user role
    if (user?.role === 'employee') {
      // Find employee ID for the current user
      const employeeId = employees.find(emp => emp.userId === user.id)?.id;
      filtered = filtered.filter(request => request.employeeId === employeeId);
    } else if (user?.role === 'manager') {
      // Show requests from team members (assuming direct reports)
      const managerEmployee = employees.find(emp => emp.userId === user.id);
      if (managerEmployee) {
        filtered = filtered.filter(request => {
          const employee = employees.find(emp => emp.id === request.employeeId);
          return employee?.managerId === managerEmployee.id;
        });
      }
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }
    
    return filtered;
  };

  // Get leave balances for the current employee
  const getCurrentEmployeeLeaveBalances = () => {
    if (user?.role === 'employee') {
      const employeeId = employees.find(emp => emp.userId === user.id)?.id;
      return leaveBalances.filter(balance => balance.employeeId === employeeId);
    }
    return [];
  };

  // Get employee balances for HR/Admin view
  const getAllEmployeeLeaveBalances = () => {
    const employeeBalances = [];
    
    employees.forEach(employee => {
      const balances = leaveBalances.filter(balance => balance.employeeId === employee.id);
      if (balances.length > 0) {
        employeeBalances.push({
          employeeName: `${employee.firstName} ${employee.lastName}`,
          balances,
        });
      }
    });
    
    return employeeBalances;
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'default';
      default:
        return 'default';
    }
  };

  const getLeaveTypeBadgeVariant = (type) => {
    switch (type) {
      case 'sick':
        return 'danger';
      case 'vacation':
        return 'primary';
      case 'casual':
        return 'info';
      case 'maternity':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredLeaveRequests = getFilteredLeaveRequests();
  const currentEmployeeLeaveBalances = getCurrentEmployeeLeaveBalances();
  const allEmployeeLeaveBalances = getAllEmployeeLeaveBalances();

  return (
    <>
      <PageHeader 
        title="Leave Management"
        subtitle="Request and manage employee leave"
        actions={
          user?.role === 'employee' && (
            <Button 
              variant="primary" 
              icon={<Plus size={16} />}
            >
              Request Leave
            </Button>
          )
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-4 px-6 font-medium text-sm border-b-2 ${
            activeTab === 'requests'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          Leave Requests
        </button>
        <button
          className={`py-4 px-6 font-medium text-sm border-b-2 ${
            activeTab === 'balances'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('balances')}
        >
          Leave Balances
        </button>
      </div>

      {/* Leave Requests View */}
      {activeTab === 'requests' && (
        <>
          {/* Filter */}
          <div className="mb-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-1">
                <div className="max-w-xs">
                  <label htmlFor="status-filter" className="sr-only">
                    Filter by status
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter size={16} className="text-gray-400" />
                    </div>
                    <select
                      id="status-filter"
                      className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Requests Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    {(user?.role === 'admin' || user?.role === 'hr' || user?.role === 'manager') && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leave Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied On
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeaveRequests.length > 0 ? (
                    filteredLeaveRequests.map((request) => (
                      <tr key={request.id}>
                        {(user?.role === 'admin' || user?.role === 'hr' || user?.role === 'manager') && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {getEmployeeName(request.employeeId)}
                              </div>
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={getLeaveTypeBadgeVariant(request.type)}>
                            {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(request.startDate).toLocaleDateString()}
                            {request.startDate !== request.endDate && (
                              <>
                                {' - '}
                                {new Date(request.endDate).toLocaleDateString()}
                              </>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {
                              Math.ceil(
                                (new Date(request.endDate).getTime() - new Date(request.startDate).getTime()) / 
                                (1000 * 60 * 60 * 24)
                              ) + 1
                            } day(s)
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={getStatusBadgeVariant(request.status)}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {(user?.role === 'admin' || user?.role === 'hr' || 
                            (user?.role === 'manager' && request.status === 'pending')) && (
                            <div className="flex justify-end space-x-2">
                              <Button variant="success" size="sm">
                                Approve
                              </Button>
                              <Button variant="danger" size="sm">
                                Reject
                              </Button>
                            </div>
                          )}
                          {user?.role === 'employee' && request.status === 'pending' && (
                            <Button variant="danger" size="sm">
                              Cancel
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={(user?.role === 'employee' ? 5 : 6)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        No leave requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Leave Balances View */}
      {activeTab === 'balances' && (
        <Card>
          {user?.role === 'employee' ? (
            <>
              {/* Single employee view */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentEmployeeLeaveBalances.map((balance) => (
                  <div key={balance.type} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium capitalize">
                        {balance.type} Leave
                      </h3>
                      <Badge variant={getLeaveTypeBadgeVariant(balance.type)}>
                        {balance.remaining} Days
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            balance.type === 'sick' ? 'bg-red-500' : 
                            balance.type === 'vacation' ? 'bg-indigo-500' : 
                            balance.type === 'casual' ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${(balance.used / balance.entitled) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Used: {balance.used} days</span>
                        <span>Total: {balance.entitled} days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* HR/Admin/Manager view of all employees */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sick Leave
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vacation Leave
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Casual Leave
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allEmployeeLeaveBalances.map((employee, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.employeeName}
                          </div>
                        </td>
                        {['sick', 'vacation', 'casual'].map((leaveType) => {
                          const balance = employee.balances.find(b => b.type === leaveType);
                          return (
                            <td key={leaveType} className="px-6 py-4 whitespace-nowrap">
                              {balance ? (
                                <div>
                                  <Badge variant={getLeaveTypeBadgeVariant(leaveType)}>
                                    {balance.remaining}/{balance.entitled}
                                  </Badge>
                                  <div className="mt-1 w-32">
                                    <div className="w-full bg-gray-200 rounded-full h-1">
                                      <div
                                        className={`h-1 rounded-full ${
                                          leaveType === 'sick' ? 'bg-red-500' : 
                                          leaveType === 'vacation' ? 'bg-indigo-500' : 'bg-blue-500'
                                        }`}
                                        style={{ width: `${(balance.used / balance.entitled) * 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default Leave;