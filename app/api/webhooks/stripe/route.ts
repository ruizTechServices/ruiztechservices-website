import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    if (!env.STRIPE_WEBHOOK_SECRET) {
        console.error('Missing STRIPE_WEBHOOK_SECRET');
        return NextResponse.json({ error: 'Config error' }, { status: 500 });
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error(`Webhook signature verification failed.`, message);
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id;
        const customerId = session.customer as string;

        if (userId) {
            console.log(`Processing payment for user ${userId}`);
            // For demo purposes: any payment adds 100 credits
            // In production, check session.line_items or metadata for specific plan
            const creditsToAdd = 100;

            const supabaseAdmin = createSupabaseAdmin();

            // Upsert user credits
            const { data: existing } = await supabaseAdmin
                .from('user_credits')
                .select('credits')
                .eq('user_id', userId)
                .single();

            let result;
            const creditsToUpdate = ((existing?.credits || 0) + creditsToAdd);

            if (existing) {
                result = await supabaseAdmin
                    .from('user_credits')
                    .update({
                        credits: creditsToUpdate,
                        stripe_customer_id: customerId,
                        updated_at: new Date().toISOString()
                    })
                    .eq('user_id', userId);
            } else {
                result = await supabaseAdmin
                    .from('user_credits')
                    .insert({
                        user_id: userId,
                        credits: creditsToAdd,
                        stripe_customer_id: customerId,
                    });
            }

            if (result.error) {
                console.error('Failed to update credits:', result.error);
                return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
            }
        } else {
            console.warn('No client_reference_id in session');
        }
    }

    return NextResponse.json({ received: true });
}
