'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { Badge } from '@/components/ui/badge';
import { Coins, Loader2 } from 'lucide-react';

export function BalanceBadge() {
    const { user } = useAuth();
    const [credits, setCredits] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchCredits = async () => {
            const supabase = createSupabaseBrowserClient();
            const { data, error } = await supabase
                .from('user_credits')
                .select('credits')
                .eq('user_id', user.id)
                .single();

            if (!error && data) {
                setCredits(data.credits);
            }
            setLoading(false);
        };

        fetchCredits();

        // Set up real-time subscription for credit updates
        const supabase = createSupabaseBrowserClient();
        const channel = supabase
            .channel('user_credits_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'user_credits',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    setCredits(payload.new.credits);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    if (!user) return null;

    return (
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 transition-colors">
            <Coins className="h-3.5 w-3.5" />
            <span className="font-bold">
                {loading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                    `${credits ?? 0} Credits`
                )}
            </span>
        </Badge>
    );
}
