// app/dashboard/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Customer Dashboard | RuizTechServices',
  description: 'Manage your projects and services with RuizTechServices.',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Customer Dashboard</CardTitle>
            <CardDescription>
              Coming soon. Your project management hub is under construction.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
