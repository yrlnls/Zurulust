import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { payslips, employees } from '../data/mockData';
import { Check, Download, DollarSign, Calendar, ChevronDown, FileText } from 'lucide-react';

const Payroll = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [expandedPayslip, setExpandedPayslip] = useState(null);
  
  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const currentYear = currentDate.getFullYear();
  
  // Filter payslips based on user role and selected month
  const getFilteredPayslips = () => {
    // If employee, only show their own payslips
    let filtered = [...payslips];
    
    if (user?.role === 'employee') {
      const employeeId = employees.find(emp => emp.userId === user.id)?.id;
      filtered = filtered.filter(payslip => payslip.employeeId === employeeId);
    }
    
    // Filter by selected month
    if (selectedMonth === 'current') {
      filtered = filtered.filter(payslip => 
        payslip.month === currentMonth && payslip.year === currentYear
      );
    } else if (selectedMonth === 'previous') {
      // Previous month logic
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
      filtered = filtered.filter(payslip => 
        payslip.month === prevMonth && payslip.year === prevYear
      );
    }
    
    return filtered;
  };

  const filteredPayslips = getFilteredPayslips();
  
  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };
  
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };
  
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'delayed':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  const togglePayslipDetails = (payslipId) => {
    setExpandedPayslip(expandedPayslip === payslipId ? null : payslipId);
  };

  return (
    <>
      <PageHeader 
        title="Payroll"
        subtitle="Manage employee salary and payslips"
        actions={
          user?.role === 'admin' || user?.role === 'hr' ? (
            <Button 
              variant="primary" 
              icon={<DollarSign size={16} />}
            >
              Run Payroll
            </Button>
          ) : null
        }
      />

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="current">Current Month</option>
              <option value="previous">Previous Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {user?.role === 'employee' ? (
        // Employee View
        <div className="space-y-6">
          {filteredPayslips.length > 0 ? (
            filteredPayslips.map((payslip) => (
              <Card key={payslip.id}>
                <div 
                  className="flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer"
                  onClick={() => togglePayslipDetails(payslip.id)}
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <FileText size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Payslip - {getMonthName(payslip.month)} {payslip.year}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Generated on {new Date(payslip.generatedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={getStatusBadgeVariant(payslip.status)}>
                      {payslip.status.charAt(0).toUpperCase() + payslip.status.slice(1)}
                    </Badge>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform ${expandedPayslip === payslip.id ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </div>
                
                {expandedPayslip === payslip.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Earnings</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Basic Salary</span>
                            <span className="text-sm font-medium">${payslip.salary.toFixed(2)}</span>
                          </div>
                          {payslip.allowances.map((allowance, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-sm text-gray-600">{allowance.type}</span>
                              <span className="text-sm font-medium">${allowance.amount.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-3 border-t border-gray-100">
                            <span className="text-sm font-medium">Total Earnings</span>
                            <span className="text-sm font-medium">
                              ${(payslip.salary + payslip.allowances.reduce((acc, a) => acc + a.amount, 0)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Deductions</h4>
                        <div className="space-y-3">
                          {payslip.deductions.map((deduction, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-sm text-gray-600">{deduction.type}</span>
                              <span className="text-sm font-medium">-${deduction.amount.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-3 border-t border-gray-100">
                            <span className="text-sm font-medium">Total Deductions</span>
                            <span className="text-sm font-medium">
                              -${payslip.deductions.reduce((acc, d) => acc + d.amount, 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Net Pay</span>
                        <span className="text-lg font-bold text-indigo-600">${payslip.netPay.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button 
                        variant="outline" 
                        icon={<Download size={16} />}
                      >
                        Download PDF
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card>
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <FileText size={24} className="text-indigo-600" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No payslips found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no payslips available for the selected period.
                </p>
              </div>
            </Card>
          )}
        </div>
      ) : (
        // Admin/HR View
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Pay
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayslips.length > 0 ? (
                  filteredPayslips.map((payslip) => (
                    <tr key={payslip.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {getEmployeeName(payslip.employeeId)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getMonthName(payslip.month)} {payslip.year}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${payslip.salary.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${payslip.netPay.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusBadgeVariant(payslip.status)}>
                          {payslip.status.charAt(0).toUpperCase() + payslip.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {payslip.status === 'pending' && (
                            <Button variant="success" size="sm" icon={<Check size={14} />}>
                              Mark Paid
                            </Button>
                          )}
                          <Button variant="outline" size="sm" icon={<Download size={14} />}>
                            Download
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      No payslips found for the selected period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
};

export default Payroll;