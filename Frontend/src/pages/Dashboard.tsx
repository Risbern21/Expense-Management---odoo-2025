import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { ApprovalCard } from '@/components/approvals/ApprovalCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockExpenses, currentUser, mockUsers } from '@/lib/mockData';
import { Plus, FileText } from 'lucide-react';
import { Expense } from '@/types';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [expenses, setExpenses] = useState(mockExpenses);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const userExpenses = currentUser.role === 'admin' 
    ? expenses 
    : expenses.filter(e => e.userId === currentUser.id);

  const pendingApprovals = expenses.filter(
    e => e.status === 'pending' && 
    (currentUser.role === 'manager' || currentUser.role === 'admin')
  );

  const handleExpenseSubmit = (newExpense: any) => {
    const expense: Expense = {
      ...newExpense,
      id: `exp-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      companyId: currentUser.companyId,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setExpenses([expense, ...expenses]);
    setShowExpenseForm(false);
  };

  const handleApprove = (expenseId: string, comment?: string) => {
    setExpenses(expenses.map(e => 
      e.id === expenseId ? { ...e, status: 'approved' as const, updatedAt: new Date().toISOString() } : e
    ));
  };

  const handleReject = (expenseId: string, comment?: string) => {
    setExpenses(expenses.map(e => 
      e.id === expenseId ? { ...e, status: 'rejected' as const, updatedAt: new Date().toISOString() } : e
    ));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <DashboardStats expenses={userExpenses} />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your latest expense submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseList expenses={userExpenses.slice(0, 3)} />
          </CardContent>
        </Card>

        {(currentUser.role === 'manager' || currentUser.role === 'admin') && (
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Expenses awaiting your review</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length > 0 ? (
                <div className="text-2xl font-bold text-warning">
                  {pendingApprovals.length} pending
                </div>
              ) : (
                <p className="text-muted-foreground">No pending approvals</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Expenses</h2>
          <p className="text-muted-foreground">Manage and track your expense claims</p>
        </div>
        <Button onClick={() => setShowExpenseForm(!showExpenseForm)}>
          <Plus className="mr-2 h-4 w-4" />
          New Expense
        </Button>
      </div>

      {showExpenseForm && (
        <ExpenseForm 
          onSubmit={handleExpenseSubmit}
          onCancel={() => setShowExpenseForm(false)}
        />
      )}

      <ExpenseList expenses={userExpenses} />
    </div>
  );

  const renderApprovals = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pending Approvals</h2>
        <p className="text-muted-foreground">Review and approve expense claims</p>
      </div>

      {pendingApprovals.length > 0 ? (
        <div className="grid gap-6">
          {pendingApprovals.map(expense => (
            <ApprovalCard
              key={expense.id}
              expense={expense}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No pending approvals</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage users and roles</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid gap-4">
        {mockUsers.map(user => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <Badge className="capitalize">{user.role}</Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Configure approval flows and company settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval Workflows</CardTitle>
          <CardDescription>Configure multi-level approval flows</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Approval flow configuration coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'expenses':
        return renderExpenses();
      case 'approvals':
        return renderApprovals();
      case 'users':
        return renderUsers();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
