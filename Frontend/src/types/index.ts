export type UserRole = 'admin' | 'manager' | 'employee';

export type ExpenseStatus = 'pending' | 'approved' | 'rejected' | 'in_review';

export type ExpenseCategory = 
  | 'travel'
  | 'meals'
  | 'accommodation'
  | 'supplies'
  | 'utilities'
  | 'other';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  managerId?: string;
  companyId: string;
  avatar?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  currency: string;
  country: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  userId: string;
  companyId: string;
  amount: number;
  currency: string;
  amountInCompanyCurrency?: number;
  category: ExpenseCategory;
  description: string;
  date: string;
  status: ExpenseStatus;
  receiptUrl?: string;
  vendorName?: string;
  createdAt: string;
  updatedAt: string;
  userName?: string;
  currentApproverId?: string;
}

export interface ApprovalFlow {
  id: string;
  companyId: string;
  name: string;
  isManagerApprover: boolean;
  approvers: Approver[];
  conditionalRules?: ConditionalRule;
  createdAt: string;
}

export interface Approver {
  userId: string;
  userName: string;
  step: number;
}

export interface ConditionalRule {
  type: 'percentage' | 'specific' | 'hybrid';
  percentage?: number;
  specificApproverId?: string;
  specificApproverName?: string;
}

export interface ApprovalAction {
  id: string;
  expenseId: string;
  approverId: string;
  approverName: string;
  action: 'approved' | 'rejected';
  comment?: string;
  timestamp: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Country {
  name: string;
  currencies: Currency[];
}
