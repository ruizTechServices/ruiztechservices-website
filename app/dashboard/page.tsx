import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BalanceBadge } from '@/components/sections/BalanceBadge';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet } from 'lucide-react';
import { createCustomerPortalSession } from '@/lib/actions/stripe';

export const metadata = {
  title: 'Customer Dashboard | RuizTechServices',
  description: 'Manage your projects and services with RuizTechServices.',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your account and technical resources.</p>
          </div>
          <BalanceBadge />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credits & Billing */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5 text-blue-600" />
                <CardTitle>Credits & Billing</CardTitle>
              </div>
              <CardDescription>
                Manage your AI API balance and payment methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 text-center border">
                <p className="text-sm text-muted-foreground mb-2">Current Balance</p>
                <div className="text-4xl font-black text-blue-600">
                  <BalanceBadge />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <form action={createCustomerPortalSession}>
                  <Button type="submit" variant="outline" className="w-full justify-start gap-2">
                    <CreditCard className="h-4 w-4" />
                    Manage Payment Methods
                  </Button>
                </form>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <a href="/pricing">Buy More Credits</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Hub Container */}
          <Card className="opacity-75">
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>
                Your technical project status and deliverables.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted p-4 rounded-full mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Coming soon. Your hub is under construction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
