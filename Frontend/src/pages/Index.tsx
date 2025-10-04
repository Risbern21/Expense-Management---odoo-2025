import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Receipt, ArrowRight, CheckCircle2, Users, FileText } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ExpenzMan</span>
            </div>
            <Button onClick={() => navigate('/dashboard')}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight">
            Smart Expense Management
            <span className="block text-primary mt-2">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Streamline your company's expense reimbursement process with multi-level approvals,
            flexible workflows, and real-time tracking.
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Button size="lg" onClick={() => navigate('/dashboard')}>
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-card p-8 rounded-lg border shadow-sm animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Level Approvals</h3>
            <p className="text-muted-foreground">
              Define custom approval flows with multiple approvers and conditional rules
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
            <p className="text-muted-foreground">
              Manage permissions for admins, managers, and employees seamlessly
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-warning" />
            </div>
            <h3 className="text-xl font-semibold mb-2">OCR Receipt Scanning</h3>
            <p className="text-muted-foreground">
              Auto-extract expense data from receipts with intelligent OCR technology
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
