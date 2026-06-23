import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('Warning: Missing STRIPE_SECRET_KEY in environment variables');
}

export const stripeClient = new Stripe(stripeSecretKey || 'mock_secret', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2025-02-18' as any,
});

/**
 * Validates whether a Stripe webhook signature is valid and parses the payload.
 */
export function verifyStripeWebhook(
  rawBody: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripeClient.webhooks.constructEvent(rawBody, signature, webhookSecret);
}
