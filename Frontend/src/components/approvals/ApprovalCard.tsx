import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Expense } from '@/types';
import { CheckCircle2, XCircle, Calendar, DollarSign, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApprovalCardProps {
  expense: Expense;
  onApprove: (expenseId: string, comment?: string) => void;
  onReject: (expenseId: string, comment?: string) => void;
}

export const ApprovalCard = ({ expense, onApprove, onReject }: ApprovalCardProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);

  const handleApprove = () => {
    onApprove(expense.id, comment);
    toast({
      title: 'Expense Approved',
      description: `Expense #${expense.id.slice(0, 8)} has been approved`,
    });
    setComment('');
    setShowComment(false);
  };

  const handleReject = () => {
    if (!comment.trim()) {
      toast({
        title: 'Comment Required',
        description: 'Please provide a reason for rejection',
        variant: 'destructive',
      });
      return;
    }
    onReject(expense.id, comment);
    toast({
      title: 'Expense Rejected',
      description: `Expense #${expense.id.slice(0, 8)} has been rejected`,
    });
    setComment('');
    setShowComment(false);
  };

  return (
    <Card className="animate-fade-in border-l-4 border-l-warning">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{expense.description}</CardTitle>
            <CardDescription className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {expense.userName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">
            {expense.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-3xl font-bold">
          <DollarSign className="h-6 w-6 text-muted-foreground" />
          {expense.amount.toFixed(2)}
          <span className="text-lg font-normal text-muted-foreground">
            {expense.currency}
          </span>
        </div>

        {expense.receiptUrl && (
          <div>
            <Badge variant="secondary">Receipt Attached</Badge>
          </div>
        )}

        {showComment && (
          <div className="space-y-2 animate-slide-up">
            <Textarea
              placeholder="Add a comment (required for rejection)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-3">
        {!showComment ? (
          <>
            <Button
              className="flex-1 bg-success hover:bg-success/90"
              onClick={() => setShowComment(true)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => setShowComment(true)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowComment(false);
                setComment('');
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-success hover:bg-success/90"
              onClick={handleApprove}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm Approval
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleReject}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Confirm Rejection
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
