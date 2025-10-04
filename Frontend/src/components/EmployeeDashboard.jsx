import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  mockUsers,
  mockExpenses,
  expenseCategories,
  currencies,
  getExpensesByEmployee,
  getTotalExpenseAmount,
  getExpensesByCategory,
} from "../data/mockData";
import {
  Plus,
  FileText,
  BarChart3,
  LogOut,
  User,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("submit");
  const [expenses, setExpenses] = useState(mockExpenses);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    amount: "",
    currency: user.currency || "USD",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [formErrors, setFormErrors] = useState({});

  // Get user's expenses
  const userExpenses = getExpensesByEmployee(user.id);

  // Get statistics
  const totalSubmitted = userExpenses.length;
  const approvedExpenses = userExpenses.filter((e) => e.status === "approved");
  const pendingExpenses = userExpenses.filter((e) => e.status === "pending");
  const rejectedExpenses = userExpenses.filter((e) => e.status === "rejected");

  const totalApprovedAmount = getTotalExpenseAmount(approvedExpenses);
  const totalPendingAmount = getTotalExpenseAmount(pendingExpenses);

  // Chart data
  const categoryData = expenseCategories
    .map((category) => {
      const categoryExpenses = getExpensesByCategory(category).filter(
        (e) => e.employee_id === user.id
      );
      const amount = getTotalExpenseAmount(categoryExpenses);
      return { name: category, amount };
    })
    .filter((item) => item.amount > 0);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFC658",
  ];

  const tabs = [
    { id: "submit", label: "Submit Expense", icon: Plus },
    { id: "expenses", label: "My Expenses", icon: FileText },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      errors.amount = "Amount must be greater than 0";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length > 500) {
      errors.description = "Description must be less than 500 characters";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selectedDate > today) {
        errors.date = "Date cannot be in the future";
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create new expense
    const newExpense = {
      id: Math.max(...expenses.map((e) => e.id)) + 1,
      employee_id: user.id,
      employee_name: user.name,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      category: formData.category,
      description: formData.description,
      date: formData.date,
      status: "pending",
      manager_id: user.manager_id,
      approved_by: null,
      rejection_reason: null,
      created_at: new Date().toISOString(),
    };

    setExpenses((prev) => [...prev, newExpense]);

    // Reset form
    setFormData({
      amount: "",
      currency: user.currency || "USD",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditExpense = (expenseId) => {
    // Implementation for editing expenses (only pending ones)
    console.log("Edit expense:", expenseId);
  };

  const handleDeleteExpense = (expenseId) => {
    // Implementation for deleting expenses (only pending ones)
    setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Employee Dashboard
                </h1>
                <p className="text-gray-600">{user.company_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
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
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Submit Expense Tab */}
        {activeTab === "submit" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Submit New Expense
              </h2>

              {/* Success Message */}
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">
                      Expense submitted successfully!
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amount */}
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Amount *
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      min="0.01"
                      step="0.01"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        formErrors.amount ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {formErrors.amount && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.amount}
                      </p>
                    )}
                  </div>

                  {/* Currency */}
                  <div>
                    <label
                      htmlFor="currency"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Currency *
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      formErrors.category ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {expenseCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.category}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      formErrors.date ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {formErrors.date && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.date}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    maxLength="500"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      formErrors.description
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Describe the expense..."
                  />
                  <div className="mt-1 flex justify-between text-sm">
                    {formErrors.description && (
                      <p className="text-red-600">{formErrors.description}</p>
                    )}
                    <p className="text-gray-500 ml-auto">
                      {formData.description.length}/500 characters
                    </p>
                  </div>
                </div>

                {/* Receipt Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receipt Upload
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Receipt upload coming soon
                    </p>
                    <p className="text-sm text-gray-500">
                      This feature will be available in a future update
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium"
                >
                  Submit for Approval
                </button>
              </form>
            </div>
          </div>
        )}

        {/* My Expenses Tab */}
        {activeTab === "expenses" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              My Expenses ({userExpenses.length})
            </h2>

            {userExpenses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No expenses yet
                </h3>
                <p className="text-gray-600">
                  Submit your first expense to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userExpenses
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((expense) => (
                    <div
                      key={expense.id}
                      className="bg-white rounded-lg shadow p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              expense.status === "approved"
                                ? "bg-green-100"
                                : expense.status === "rejected"
                                ? "bg-red-100"
                                : "bg-yellow-100"
                            }`}
                          >
                            {expense.status === "approved" ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : expense.status === "rejected" ? (
                              <XCircle className="h-6 w-6 text-red-600" />
                            ) : (
                              <Clock className="h-6 w-6 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {expense.currency} {expense.amount.toFixed(2)}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {expense.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              expense.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : expense.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {expense.status}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            {expense.date}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">
                        {expense.description}
                      </p>

                      {expense.status === "approved" && expense.approved_by && (
                        <p className="text-sm text-green-600 mb-2">
                          ✓ Approved by {expense.approved_by}
                        </p>
                      )}

                      {expense.status === "rejected" &&
                        expense.rejection_reason && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">
                              <strong>Rejection reason:</strong>{" "}
                              {expense.rejection_reason}
                            </p>
                          </div>
                        )}

                      {expense.status === "pending" && (
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={() => handleEditExpense(expense.id)}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-300 rounded hover:bg-blue-50"
                          >
                            <Edit className="h-3 w-3" />
                            <span className="text-sm">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="flex items-center space-x-1 text-red-600 hover:text-red-800 px-3 py-1 border border-red-300 rounded hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="text-sm">Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Expense Dashboard
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Submitted
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalSubmitted}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Approved
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {user.currency} {totalApprovedAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Pending Approval
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {user.currency} {totalPendingAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Rejected
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {rejectedExpenses.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expenses by Category */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Expenses by Category
                </h3>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `${user.currency} ${value.toFixed(2)}`,
                          "Amount",
                        ]}
                      />
                      <Bar dataKey="amount" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No expense data available for chart
                  </div>
                )}
              </div>

              {/* Category Pie Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Category Distribution
                </h3>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `${user.currency} ${value.toFixed(2)}`,
                          "Amount",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No expense data available for chart
                  </div>
                )}
              </div>
            </div>

            {/* Recent Expenses */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Expenses
              </h3>
              {userExpenses.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No expenses submitted yet
                </p>
              ) : (
                <div className="space-y-3">
                  {userExpenses
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map((expense) => (
                      <div
                        key={expense.id}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              expense.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : expense.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {expense.status}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">
                              {expense.category}
                            </p>
                            <p className="text-sm text-gray-500">
                              {expense.date}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">
                          {expense.currency} {expense.amount.toFixed(2)}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
