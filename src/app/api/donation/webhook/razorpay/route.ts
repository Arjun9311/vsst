import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyWebhookSignature } from '@/lib/payments/razorpay';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-ray-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 });
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      return NextResponse.json({ error: 'Signature mismatch' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    // We process only payment captured events
    if (event === 'payment.captured') {
      const paymentEntity = payload.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;

      // Locate matching donation record
      const donation = await prisma.donation.findFirst({
        where: { gateway_order_id: orderId },
      });

      if (!donation) {
        return NextResponse.json({ error: 'Donation log not found' }, { status: 404 });
      }

      if (donation.status === 'captured') {
        return NextResponse.json({ status: 'already_processed' });
      }

      // Update payment details and status
      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: 'captured',
          gateway_payment_id: paymentId,
        },
      });

      // NOTE: PDF generation and transactional email dispatch can be triggered asynchronously here.
    }

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('Razorpay webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', message: error.message },
      { status: 500 }
    );
  }
}
