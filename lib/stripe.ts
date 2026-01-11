import Stripe from 'stripe';
import { env } from '@/lib/env';

const secretKey = env.STRIPE_SECRET_KEY?.trim() || 'sk_test_placeholder';

export const stripe = new Stripe(secretKey, {
    typescript: true,
});

