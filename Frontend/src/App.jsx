import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return children;
};

// Dashboard Router Component
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "employee":
      return <EmployeeDashboard />;
    default:
      return <LoginPage />;
  }
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ProtectedRoute>
          <DashboardRouter />
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}

export default App;
