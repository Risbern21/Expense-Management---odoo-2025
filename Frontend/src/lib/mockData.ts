import { User, Company, Expense, ApprovalFlow } from '@/types';

// Mock company
export const mockCompany: Company = {
  id: 'company-1',
  name: 'Acme Corp',
  currency: 'USD',
  country: 'United States',
  createdAt: '2024-01-01T00:00:00Z',
};

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@acme.com',
    name: 'John Admin',
    role: 'admin',
    companyId: 'company-1',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'manager@acme.com',
    name: 'Sarah Manager',
    role: 'manager',
    companyId: 'company-1',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 'user-3',
    email: 'employee@acme.com',
    name: 'Mike Employee',
    role: 'employee',
    managerId: 'user-2',
    companyId: 'company-1',
    createdAt: '2024-01-03T00:00:00Z',
  },
];

// Mock expenses
export const mockExpenses: Expense[] = [
  {
    id: 'exp-1',
    userId: 'user-3',
    userName: 'Mike Employee',
    companyId: 'company-1',
    amount: 150.50,
    currency: 'USD',
    category: 'meals',
    description: 'Client dinner meeting',
    date: '2024-10-01',
    status: 'pending',
    currentApproverId: 'user-2',
    createdAt: '2024-10-01T10:00:00Z',
    updatedAt: '2024-10-01T10:00:00Z',
  },
  {
    id: 'exp-2',
    userId: 'user-3',
    userName: 'Mike Employee',
    companyId: 'company-1',
    amount: 450.00,
    currency: 'USD',
    category: 'travel',
    description: 'Flight to NYC for conference',
    date: '2024-09-28',
    status: 'approved',
    createdAt: '2024-09-28T14:00:00Z',
    updatedAt: '2024-09-30T09:00:00Z',
  },
  {
    id: 'exp-3',
    userId: 'user-3',
    userName: 'Mike Employee',
    companyId: 'company-1',
    amount: 89.99,
    currency: 'USD',
    category: 'supplies',
    description: 'Office supplies',
    date: '2024-09-25',
    status: 'rejected',
    createdAt: '2024-09-25T11:00:00Z',
    updatedAt: '2024-09-26T15:00:00Z',
  },
];

// Mock approval flows
export const mockApprovalFlows: ApprovalFlow[] = [
  {
    id: 'flow-1',
    companyId: 'company-1',
    name: 'Standard Approval',
    isManagerApprover: true,
    approvers: [
      { userId: 'user-2', userName: 'Sarah Manager', step: 1 },
      { userId: 'user-1', userName: 'John Admin', step: 2 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Current logged in user (can be changed for testing)
export let currentUser: User = mockUsers[2]; // Default to employee

export const setCurrentUser = (user: User) => {
  currentUser = user;
};
