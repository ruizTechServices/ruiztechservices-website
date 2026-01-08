// app/admin/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactSubmissionsManager } from '@/components/admin/ContactSubmissionsManager';
import { getContactSubmissions } from '@/lib/actions/admin-contact';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Dashboard | RuizTechServices',
  description: 'Administrative controls for RuizTechServices.',
};

export default async function AdminPage() {
  const { data: submissions, error } = await getContactSubmissions();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>
              Manage contact submissions and site administration.
            </CardDescription>
          </CardHeader>
        </Card>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Submissions</h2>
          {error ? (
            <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
              Error loading submissions: {error}
            </div>
          ) : (
            <ContactSubmissionsManager submissions={submissions || []} />
          )}
        </section>
      </div>
    </main>
  );
}
