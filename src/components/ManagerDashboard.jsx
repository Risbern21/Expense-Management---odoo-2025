import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, mockExpenses, getEmployeesByManager } from '../data/mockData';
import { 
  Clock, 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  LogOut,
  User,
  Building2,
  Calendar,
  DollarSign
} from 'lucide-react';

const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [expenses, setExpenses] = useState(mockExpenses);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Get team members
  const teamMembers = getEmployeesByManager(user.id);
  
  // Get expenses for approval (pending expenses from team members)
  const pendingExpenses = expenses.filter(expense => 
    expense.status === 'pending' && expense.manager_id === user.id
  );
  
  // Get all team expenses
  const teamExpenses = expenses.filter(expense => 
    expense.manager_id === user.id
  );

  const handleApproveExpense = (expenseId) => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId 
        ? { 
            ...expense, 
            status: 'approved', 
            approved_by: user.name,
            rejection_reason: null
          }
        : expense
    ));
  };

  const handleRejectExpense = (expenseId) => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId 
        ? { 
            ...expense, 
            status: 'rejected', 
            approved_by: null,
            rejection_reason: rejectionReason
          }
        : expense
    ));
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedExpense(null);
  };

  const openRejectModal = (expense) => {
    setSelectedExpense(expense);
    setShowRejectModal(true);
  };

  const tabs = [
    { id: 'pending', label: 'Pending Approvals', icon: Clock },
    { id: 'expenses', label: 'Team Expenses', icon: FileText },
    { id: 'team', label: 'My Team', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
                <p className="text-gray-600">{user.company_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.id === 'pending' && pendingExpenses.length > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {pendingExpenses.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pending Approvals Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Pending Approvals ({pendingExpenses.length})
              </h2>
            </div>

            {pendingExpenses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">No pending expense approvals at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingExpenses.map((expense) => (
                  <div key={expense.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{expense.employee_name}</h3>
                          <p className="text-sm text-gray-500">{expense.date}</p>
                        </div>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium text-gray-900">
                          {expense.currency} {expense.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-900">{expense.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Description:</span>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {expense.description}
                      </p>
                    </div>

                    {/* Receipt Placeholder */}
                    <div className="mb-6">
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Receipt Image</p>
                          <p className="text-xs text-gray-400">Feature coming soon</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApproveExpense(expense.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => openRejectModal(expense)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Team Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Team Expenses</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Approved By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{expense.employee_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {expense.currency} {expense.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{expense.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{expense.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          expense.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : expense.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {expense.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.approved_by || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* My Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">My Team ({teamMembers.length} members)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => {
                const memberExpenses = teamExpenses.filter(e => e.employee_id === member.id);
                const totalAmount = memberExpenses.reduce((sum, exp) => sum + exp.amount, 0);
                
                return (
                  <div key={member.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Expenses:</span>
                        <span className="font-medium">{memberExpenses.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium">
                          {mockUsers.find(u => u.id === member.id)?.company_id === 1 ? 'USD' : 'USD'} {totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pending:</span>
                        <span className="font-medium text-yellow-600">
                          {memberExpenses.filter(e => e.status === 'pending').length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Approved:</span>
                        <span className="font-medium text-green-600">
                          {memberExpenses.filter(e => e.status === 'approved').length}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reject Expense
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Rejecting expense from <strong>{selectedExpense?.employee_name}</strong>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Amount: {selectedExpense?.currency} {selectedExpense?.amount.toFixed(2)}
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for rejection
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="3"
                  placeholder="Please provide a reason for rejection..."
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                    setSelectedExpense(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRejectExpense(selectedExpense.id)}
                  disabled={!rejectionReason.trim()}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
