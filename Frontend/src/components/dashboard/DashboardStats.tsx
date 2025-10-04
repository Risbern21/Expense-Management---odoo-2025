import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Expense } from '@/types';

interface DashboardStatsProps {
  expenses: Expense[];
}

export const DashboardStats = ({ expenses }: DashboardStatsProps) => {
  const stats = {
    total: expenses.length,
    pending: expenses.filter(e => e.status === 'pending').length,
    approved: expenses.filter(e => e.status === 'approved').length,
    rejected: expenses.filter(e => e.status === 'rejected').length,
    totalAmount: expenses
      .filter(e => e.status === 'approved')
      .reduce((sum, e) => sum + e.amount, 0),
  };

  const cards = [
    {
      title: 'Total Expenses',
      value: stats.total,
      icon: Receipt,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      title: 'Approved',
      value: stats.approved,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`rounded-full p-2 ${card.bg}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.title === 'Approved' && (
                <p className="text-xs text-muted-foreground mt-1">
                  ${stats.totalAmount.toFixed(2)} total
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
