'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Trash2, Mail, Clock, User } from 'lucide-react';
import type { ContactSubmission } from '@/lib/supabase';
import {
  updateContactSubmissionStatus,
  deleteContactSubmission,
} from '@/lib/actions/admin-contact';

interface ContactSubmissionsManagerProps {
  submissions: ContactSubmission[];
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500',
  read: 'bg-yellow-500',
  replied: 'bg-green-500',
};

export function ContactSubmissionsManager({
  submissions,
}: ContactSubmissionsManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = (id: number, status: 'new' | 'read' | 'replied') => {
    setError(null);
    startTransition(async () => {
      const result = await updateContactSubmissionStatus(id, status);
      if (!result.success) {
        setError(result.error || 'Failed to update status');
      }
    });
  };

  const handleDelete = (id: number) => {
    setError(null);
    startTransition(async () => {
      const result = await deleteContactSubmission(id);
      if (!result.success) {
        setError(result.error || 'Failed to delete submission');
      }
    });
  };

  if (submissions.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          No contact submissions yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {submissions.map((submission) => (
        <Card key={submission.id} className={isPending ? 'opacity-50' : ''}>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{submission.name}</span>
                  <Badge className={`${statusColors[submission.status || 'new']} sm:hidden flex-shrink-0`}>
                    {submission.status || 'new'}
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <a
                    href={`mailto:${submission.email}`}
                    className="hover:underline truncate"
                  >
                    {submission.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  {submission.created_at
                    ? new Date(submission.created_at).toLocaleString()
                    : 'Unknown date'}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className={`${statusColors[submission.status || 'new']} hidden sm:inline-flex`}>
                  {submission.status || 'new'}
                </Badge>

                <Select
                  defaultValue={submission.status || 'new'}
                  onValueChange={(value) =>
                    handleStatusChange(
                      submission.id!,
                      value as 'new' | 'read' | 'replied'
                    )
                  }
                  disabled={isPending}
                >
                  <SelectTrigger className="w-24 sm:w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                  </SelectContent>
                </Select>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete submission?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the contact submission from{' '}
                        {submission.name}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(submission.id!)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {submission.message}
              </pre>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
