import Stripe from 'stripe';
import { env } from '@/lib/env';

const secretKey = env.STRIPE_SECRET_KEY?.trim() || '';

export const stripe = new Stripe(secretKey, {
    typescript: true,
});

