import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Expense } from '@/types';
import { cn } from '@/lib/utils';
import { Calendar, DollarSign, FileText } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseClick?: (expense: Expense) => void;
}

export const ExpenseList = ({ expenses, onExpenseClick }: ExpenseListProps) => {
  const getStatusVariant = (status: Expense['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-info text-info-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      travel: 'border-l-blue-500',
      meals: 'border-l-orange-500',
      accommodation: 'border-l-purple-500',
      supplies: 'border-l-green-500',
      utilities: 'border-l-yellow-500',
      other: 'border-l-gray-500',
    };
    return colors[category] || colors.other;
  };

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">No expenses found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <Card
          key={expense.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md border-l-4 animate-fade-in",
            getCategoryColor(expense.category)
          )}
          onClick={() => onExpenseClick?.(expense)}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{expense.description}</CardTitle>
                <CardDescription className="flex items-center gap-4 text-sm">
                  {expense.userName && (
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {expense.userName}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </CardDescription>
              </div>
              <Badge className={cn("capitalize", getStatusVariant(expense.status))}>
                {expense.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  {expense.amount.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">
                    {expense.currency}
                  </span>
                </div>
                <Badge variant="outline" className="capitalize">
                  {expense.category}
                </Badge>
              </div>
              {expense.receiptUrl && (
                <Badge variant="secondary">Receipt Attached</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
