'use server';

import { stripe } from '@/lib/stripe';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createCheckoutSession() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        const redirectUrl = new URL('/', 'http://localhost:3000'); // Use a placeholder or extract from headers
        redirectUrl.searchParams.set('auth_error', 'login_required');
        redirectUrl.searchParams.set('auth_error_description', 'Please sign in to purchase credits.');
        redirectUrl.searchParams.set('next', '/pricing');

        // Use origin from headers if available for better URL construction
        const headersList = await headers();
        const origin = headersList.get('origin') || 'http://localhost:3000';
        const finalUrl = new URL('/?auth_error=login_required&auth_error_description=Please+sign+in+to+purchase+credits.&next=/pricing', origin);

        redirect(finalUrl.toString());
    }

    const headersList = await headers();
    const origin = headersList.get('origin');

    // Check if we already have a Stripe Customer ID for this user
    const { data: profile } = await supabase
        .from('user_credits')
        .select('stripe_customer_id')
        .eq('user_id', user.id)
        .single();

    const customerParams = profile?.stripe_customer_id
        ? { customer: profile.stripe_customer_id }
        : {
            customer_email: user.email,
            customer_creation: 'always' as const
        };

    // Set metadata to double-confirm user connection
    const metadata = { userId: user.id };


    // Hardcoded for demo: 100 Credits for $10
    // In production, you would fetch this from Stripe or pass a Price ID
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        ...customerParams,
        metadata,
        payment_intent_data: {
            setup_future_usage: 'on_session',
        },
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: '100 AI Credits',
                        description: 'Pack of 100 credits for ruizTech AI services',
                    },
                    unit_amount: 1000, // $10.00
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${origin}/dashboard?success=true`,
        cancel_url: `${origin}/pricing?canceled=true`,
        client_reference_id: user.id,
        customer_email: user.email,
    });

    if (!session.url) {
        throw new Error('Failed to create checkout session');
    }

    redirect(session.url);
}

export async function createCustomerPortalSession() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('You must be logged in to manage billing.');
    }

    // Find the Stripe Customer ID for this user
    const { data: profile } = await supabase
        .from('user_credits')
        .select('stripe_customer_id')
        .eq('user_id', user.id)
        .single();

    if (!profile?.stripe_customer_id) {
        // If they haven't bought anything yet, they don't have a customer ID.
        // We could create one, or redirect them to pricing.
        // For now, let's redirect to pricing with a message.
        const headersList = await headers();
        const origin = headersList.get('origin') || 'http://localhost:3000';
        redirect(`${origin}/pricing?message=no_payment_methods`);
    }

    const headersList = await headers();
    const origin = headersList.get('origin') || 'http://localhost:3000';

    const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: `${origin}/dashboard`,
    });

    if (!session.url) {
        throw new Error('Failed to create customer portal session');
    }

    redirect(session.url);
}
