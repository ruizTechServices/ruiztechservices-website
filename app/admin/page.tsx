// app/admin/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Admin Dashboard | RuizTechServices',
  description: 'Administrative controls for RuizTechServices.',
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-3xl mx-auto p-6 space-y-10">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>
              Admin access only. Management tools coming soon.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
