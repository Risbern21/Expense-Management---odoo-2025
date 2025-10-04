// Mock Data for Expense Management System

export const mockCompany = {
  id: 1,
  name: "Acme Corporation",
  currency: "USD",
  country: "United States",
  created_at: "2024-01-01T00:00:00Z",
};

export const mockUsers = [
  // Admin
  {
    id: 1,
    email: "admin@acme.com",
    name: "Sarah Admin",
    role: "admin",
    company_id: 1,
    manager_id: null,
    created_at: "2024-01-01T00:00:00Z",
  },
  // Managers
  {
    id: 2,
    email: "mike@acme.com",
    name: "Mike Manager",
    role: "manager",
    company_id: 1,
    manager_id: null,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    email: "lisa@acme.com",
    name: "Lisa Lead",
    role: "manager",
    company_id: 1,
    manager_id: null,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    email: "david@acme.com",
    name: "David Director",
    role: "manager",
    company_id: 1,
    manager_id: null,
    created_at: "2024-01-01T00:00:00Z",
  },
  // Employees under Mike Manager (id: 2)
  {
    id: 5,
    email: "john@acme.com",
    name: "John Doe",
    role: "employee",
    company_id: 1,
    manager_id: 2,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: 6,
    email: "jane@acme.com",
    name: "Jane Smith",
    role: "employee",
    company_id: 1,
    manager_id: 2,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: 7,
    email: "bob@acme.com",
    name: "Bob Wilson",
    role: "employee",
    company_id: 1,
    manager_id: 2,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: 8,
    email: "alice@acme.com",
    name: "Alice Johnson",
    role: "employee",
    company_id: 1,
    manager_id: 2,
    created_at: "2024-01-15T00:00:00Z",
  },
  // Employees under Lisa Lead (id: 3)
  {
    id: 9,
    email: "charlie@acme.com",
    name: "Charlie Brown",
    role: "employee",
    company_id: 1,
    manager_id: 3,
    created_at: "2024-01-20T00:00:00Z",
  },
  {
    id: 10,
    email: "diana@acme.com",
    name: "Diana Prince",
    role: "employee",
    company_id: 1,
    manager_id: 3,
    created_at: "2024-01-20T00:00:00Z",
  },
  {
    id: 11,
    email: "eve@acme.com",
    name: "Eve Adams",
    role: "employee",
    company_id: 1,
    manager_id: 3,
    created_at: "2024-01-20T00:00:00Z",
  },
  // Employees under David Director (id: 4)
  {
    id: 12,
    email: "frank@acme.com",
    name: "Frank Miller",
    role: "employee",
    company_id: 1,
    manager_id: 4,
    created_at: "2024-01-25T00:00:00Z",
  },
  {
    id: 13,
    email: "grace@acme.com",
    name: "Grace Lee",
    role: "employee",
    company_id: 1,
    manager_id: 4,
    created_at: "2024-01-25T00:00:00Z",
  },
  {
    id: 14,
    email: "henry@acme.com",
    name: "Henry Ford",
    role: "employee",
    company_id: 1,
    manager_id: 4,
    created_at: "2024-01-25T00:00:00Z",
  },
  {
    id: 15,
    email: "ivy@acme.com",
    name: "Ivy Chen",
    role: "employee",
    company_id: 1,
    manager_id: 4,
    created_at: "2024-01-25T00:00:00Z",
  },
];

export const mockExpenses = [
  // John Doe expenses (employee_id: 5, manager_id: 2)
  {
    id: 1,
    employee_id: 5,
    employee_name: "John Doe",
    amount: 125.5,
    currency: "USD",
    category: "Travel",
    description: "Uber ride to client meeting",
    date: "2024-12-15",
    status: "approved",
    manager_id: 2,
    approved_by: "Mike Manager",
    rejection_reason: null,
    created_at: "2024-12-15T09:00:00Z",
  },
  {
    id: 2,
    employee_id: 5,
    employee_name: "John Doe",
    amount: 45.0,
    currency: "USD",
    category: "Food",
    description: "Business lunch with potential client",
    date: "2024-12-14",
    status: "pending",
    manager_id: 2,
    approved_by: null,
    rejection_reason: null,
    created_at: "2024-12-14T13:30:00Z",
  },
  {
    id: 3,
    employee_id: 5,
    employee_name: "John Doe",
    amount: 250.0,
    currency: "USD",
    category: "Accommodation",
    description: "Hotel stay during conference",
    date: "2024-12-10",
    status: "approved",
    manager_id: 2,
    approved_by: "Mike Manager",
    rejection_reason: null,
    created_at: "2024-12-10T16:00:00Z",
  },

  // Jane Smith expenses (employee_id: 6, manager_id: 2)
  {
    id: 4,
    employee_id: 6,
    employee_name: "Jane Smith",
    amount: 89.99,
    currency: "USD",
    category: "Office Supplies",
    description: "Software license renewal",
    date: "2024-12-13",
    status: "approved",
    manager_id: 2,
    approved_by: "Mike Manager",
    rejection_reason: null,
    created_at: "2024-12-13T11:00:00Z",
  },
  {
    id: 5,
    employee_id: 6,
    employee_name: "Jane Smith",
    amount: 75.0,
    currency: "USD",
    category: "Transport",
    description: "Parking fees for client visits",
    date: "2024-12-12",
    status: "rejected",
    manager_id: 2,
    approved_by: null,
    rejection_reason: "Please use company parking or public transport",
    created_at: "2024-12-12T08:00:00Z",
  },
  {
    id: 6,
    employee_id: 6,
    employee_name: "Jane Smith",
    amount: 150.0,
    currency: "USD",
    category: "Entertainment",
    description: "Team building dinner",
    date: "2024-12-11",
    status: "pending",
    manager_id: 2,
    approved_by: null,
    rejection_reason: null,
    created_at: "2024-12-11T19:00:00Z",
  },

  // Bob Wilson expenses (employee_id: 7, manager_id: 2)
  {
    id: 7,
    employee_id: 7,
    employee_name: "Bob Wilson",
    amount: 320.0,
    currency: "EUR",
    category: "Travel",
    description: "Flight to Berlin office",
    date: "2024-12-09",
    status: "approved",
    manager_id: 2,
    approved_by: "Mike Manager",
    rejection_reason: null,
    created_at: "2024-12-09T14:00:00Z",
  },
  {
    id: 8,
    employee_id: 7,
    employee_name: "Bob Wilson",
    amount: 65.5,
    currency: "EUR",
    category: "Food",
    description: "Meals during business trip",
    date: "2024-12-08",
    status: "pending",
    manager_id: 2,
    approved_by: null,
    rejection_reason: null,
    created_at: "2024-12-08T12:00:00Z",
  },

  // Alice Johnson expenses (employee_id: 8, manager_id: 2)
  {
    id: 9,
    employee_id: 8,
    employee_name: "Alice Johnson",
    amount: 95.0,
    currency: "USD",
    category: "Office Supplies",
    description: "New monitor for workstation",
    date: "2024-12-07",
    status: "approved",
    manager_id: 2,
    approved_by: "Mike Manager",
    rejection_reason: null,
    created_at: "2024-12-07T10:00:00Z",
  },
  {
    id: 10,
    employee_id: 8,
    employee_name: "Alice Johnson",
    amount: 180.0,
    currency: "USD",
    category: "Transport",
    description: "Rental car for client site visit",
    date: "2024-12-06",
    status: "rejected",
    manager_id: 2,
    approved_by: null,
    rejection_reason: "Please use company car service instead",
    created_at: "2024-12-06T09:00:00Z",
  },

  // Charlie Brown expenses (employee_id: 9, manager_id: 3)
  {
    id: 11,
    employee_id: 9,
    employee_name: "Charlie Brown",
    amount: 200.0,
    currency: "USD",
    category: "Travel",
    description: "Train tickets for regional meeting",
    date: "2024-12-05",
    status: "approved",
    manager_id: 3,
    approved_by: "Lisa Lead",
    rejection_reason: null,
    created_at: "2024-12-05T07:00:00Z",
  },
  {
    id: 12,
    employee_id: 9,
    employee_name: "Charlie Brown",
    amount: 35.0,
    currency: "USD",
    category: "Food",
    description: "Coffee meeting with vendor",
    date: "2024-12-04",
    status: "pending",
    manager_id: 3,
    approved_by: null,
    rejection_reason: null,
    created_at: "2024-12-04T15:00:00Z",
  },

  // Diana Prince expenses (employee_id: 10, manager_id: 3)
  {
    id: 13,
    employee_id: 10,
    employee_name: "Diana Prince",
    amount: 450.0,
    currency: "USD",
    category: "Accommodation",
    description: "Conference hotel booking",
    date: "2024-12-03",
    status: "approved",
    manager_id: 3,
    approved_by: "Lisa Lead",
    rejection_reason: null,
    created_at: "2024-12-03T16:00:00Z",
  },
  {
    id: 14,
    employee_id: 10,
    employee_name: "Diana Prince",
    amount: 120.0,
    currency: "USD",
    category: "Transport",
    description: "Taxi to airport",
    date: "2024-12-02",
    status: "pending",
    manager_id: 3,
    approved_by: null,
    rejection_reason: null,
    created_at: "2024-12-02T05:00:00Z",
  },

  // Eve Adams expenses (employee_id: 11, manager_id: 3)
  {
    id: 15,
    employee_id: 11,
    employee_name: "Eve Adams",
    amount: 75.0,
    currency: "USD",
    category: "Office Supplies",
    description: "Stationery for project documentation",
    date: "2024-12-01",
    status: "approved",
    manager_id: 3,
    approved_by: "Lisa Lead",
    rejection_reason: null,
    created_at: "2024-12-01T14:00:00Z",
  },
  {
    id: 16,
    employee_id: 11,
    employee_name: "Eve Adams",
    amount: 300.0,
    currency: "INR",
    category: "Entertainment",
    description: "Client entertainment dinner",
    date: "2024-11-30",
    status: "rejected",
    manager_id: 3,
    approved_by: null,
    rejection_reason: "Amount exceeds entertainment budget limit",
    created_at: "2024-11-30T20:00:00Z",
  },

  // Frank Miller expenses (employee_id: 12, manager_id: 4)
  {
    id: 17,
    employee_id: 12,
    employee_name: "Frank Miller",
    amount: 150.0,
    currency: "USD",
    category: "Travel",
    description: "Bus tickets for team retreat",
    date: "2024-11-29",
    status: "approved",
    manager_id: 4,
    approved_by: "David Director",
    rejection_reason: null,
    created_at: "2024-11-29T08:00:00Z",
  },
  {
    id: 18,
    employee_id: 12,
    employee_name: "Frank Miller",
    amount: 55.0,
    currency: "USD",
    category: "Food",
    description: "Team lunch meeting",
    date: "2024-11-28",
    status: "pending",
    manager_id: 4,
    approved_by: null,
    rejection_reason: null,
    created_at: "2024-11-28T12:00:00Z",
  },

  // Grace Lee expenses (employee_id: 13, manager_id: 4)
  {
    id: 19,
    employee_id: 13,
    employee_name: "Grace Lee",
    amount: 220.0,
    currency: "USD",
    category: "Accommodation",
    description: "Hotel for training seminar",
    date: "2024-11-27",
    status: "approved",
    manager_id: 4,
    approved_by: "David Director",
    rejection_reason: null,
    created_at: "2024-11-27T18:00:00Z",
  },
  {
    id: 20,
    employee_id: 13,
    employee_name: "Grace Lee",
    amount: 85.0,
    currency: "USD",
    category: "Transport",
    description: "Ride sharing to client office",
    date: "2024-11-26",
    status: "rejected",
    manager_id: 4,
    approved_by: null,
    rejection_reason: "Please use company car pool or public transport",
    created_at: "2024-11-26T10:00:00Z",
  },

  // Henry Ford expenses (employee_id: 14, manager_id: 4)
  {
    id: 21,
    employee_id: 14,
    employee_name: "Henry Ford",
    amount: 110.0,
    currency: "USD",
    category: "Office Supplies",
    description: "Software subscription renewal",
    date: "2024-11-25",
    status: "approved",
    manager_id: 4,
    approved_by: "David Director",
    rejection_reason: null,
    created_at: "2024-11-25T11:00:00Z",
  },
  {
    id: 22,
    employee_id: 14,
    employee_name: "Henry Ford",
    amount: 175.0,
    currency: "USD",
    category: "Entertainment",
    description: "Client networking event",
    date: "2024-11-24",
    status: "pending",
    manager_id: 4,
    approved_by: null,
    rejection_reason: null,
    created_at: "2024-11-24T19:00:00Z",
  },

  // Ivy Chen expenses (employee_id: 15, manager_id: 4)
  {
    id: 23,
    employee_id: 15,
    employee_name: "Ivy Chen",
    amount: 95.0,
    currency: "USD",
    category: "Travel",
    description: "Local transport for site visits",
    date: "2024-11-23",
    status: "approved",
    manager_id: 4,
    approved_by: "David Director",
    rejection_reason: null,
    created_at: "2024-11-23T09:00:00Z",
  },
  {
    id: 24,
    employee_id: 15,
    employee_name: "Ivy Chen",
    amount: 40.0,
    currency: "USD",
    category: "Food",
    description: "Working lunch with colleague",
    date: "2024-11-22",
    status: "approved",
    manager_id: 4,
    approved_by: "David Director",
    rejection_reason: null,
    created_at: "2024-11-22T13:00:00Z",
  },
];

// Helper functions for mock data
export const getUsersByRole = (role) => {
  return mockUsers.filter((user) => user.role === role);
};

export const getEmployeesByManager = (managerId) => {
  return mockUsers.filter((user) => user.manager_id === managerId);
};

export const getExpensesByEmployee = (employeeId) => {
  return mockExpenses.filter((expense) => expense.employee_id === employeeId);
};

export const getExpensesByManager = (managerId) => {
  return mockExpenses.filter((expense) => expense.manager_id === managerId);
};

export const getPendingExpenses = () => {
  return mockExpenses.filter((expense) => expense.status === "pending");
};

export const getExpensesByStatus = (status) => {
  return mockExpenses.filter((expense) => expense.status === status);
};

export const getExpensesByCategory = (category) => {
  return mockExpenses.filter((expense) => expense.category === category);
};

export const getTotalExpenseAmount = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getExpensesThisMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return mockExpenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });
};

// Expense categories
export const expenseCategories = [
  "Travel",
  "Food",
  "Accommodation",
  "Transport",
  "Office Supplies",
  "Entertainment",
  "Other",
];

// Currencies
export const currencies = ["USD", "EUR", "INR", "GBP", "CAD", "AUD"];
