import Razorpay from 'razorpay';
import crypto from 'crypto';

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  // We log a warning but don't crash compile-time builds. Checks are done at runtime request.
  console.warn('Warning: Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in environment variables');
}

export const razorpayClient = new Razorpay({
  key_id: keyId || 'mock_key',
  key_secret: keySecret || 'mock_secret',
});

/**
 * Verifies standard checkout signature returned by Razorpay UI modal
 */
export function verifyCheckoutSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!keySecret) return false;
  
  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}

/**
 * Verifies webhook event signature sent by Razorpay webhook platform
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string
): boolean {
  const generatedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  return generatedSignature === signature;
}
