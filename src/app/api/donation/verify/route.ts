import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyCheckoutSignature } from '@/lib/payments/razorpay';
import { decrypt } from '@/lib/crypto';
import { generate80GReceiptPdf } from '@/lib/pdf/receipt';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, paymentId, signature, dbOrderId } = body;

    if (!orderId || !paymentId || !signature || !dbOrderId) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // Verify signature
    const isValid = verifyCheckoutSignature(orderId, paymentId, signature);
    if (!isValid) {
      // In local dev/testing, if environment variables for Razorpay are not set, we can allow mock verification
      if (process.env.RAZORPAY_KEY_SECRET === undefined || process.env.RAZORPAY_KEY_SECRET === '') {
        console.warn('RAZORPAY_KEY_SECRET is not set. Allowing payment in sandbox mode.');
      } else {
        return NextResponse.json({ error: 'Invalid signature verification failed' }, { status: 400 });
      }
    }

    // Get the donation record
    const donation = await prisma.donation.findUnique({
      where: { id: dbOrderId },
      include: { donor: true },
    });

    if (!donation) {
      return NextResponse.json({ error: 'Donation record not found' }, { status: 404 });
    }

    if (donation.status === 'captured') {
      return NextResponse.json({
        success: true,
        receiptUrl: donation.receipt_url,
        message: 'Payment already processed and captured',
      });
    }

    // Decrypt donor details for receipt generation
    const donorName = decrypt(Buffer.from(donation.donor.name));
    const donorEmail = donation.donor.email;
    const donorPan = donation.donor.pan ? decrypt(Buffer.from(donation.donor.pan)) : 'N/A';
    const donorAddress = donation.donor.address ? decrypt(Buffer.from(donation.donor.address)) : 'N/A';
    
    // Create receipt number and date
    const receiptNo = `REC-${new Date().getFullYear()}-${donation.id.slice(0, 8).toUpperCase()}`;
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    // Generate PDF receipt
    const pdfBuffer = await generate80GReceiptPdf({
      receiptNo,
      date: dateStr,
      donorName,
      donorEmail,
      donorPan,
      donorAddress,
      amount: Number(donation.amount),
      paymentMode: 'razorpay',
      transactionId: paymentId,
      isForeign: donation.donor.is_foreign,
    });

    // Save to public receipts folder
    const receiptsDir = path.join(process.cwd(), 'public', 'receipts');
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir, { recursive: true });
    }

    const receiptFileName = `receipt_${donation.id}.pdf`;
    const receiptPath = path.join(receiptsDir, receiptFileName);
    fs.writeFileSync(receiptPath, pdfBuffer);

    const receiptUrl = `/receipts/${receiptFileName}`;

    // Update database
    await prisma.donation.update({
      where: { id: donation.id },
      data: {
        status: 'captured',
        gateway_payment_id: paymentId,
        receipt_url: receiptUrl,
      },
    });

    return NextResponse.json({
      success: true,
      receiptUrl,
      message: 'Donation captured and receipt generated successfully',
    });
  } catch (error: any) {
    console.error('Payment verification failed:', error);
    return NextResponse.json(
      { error: 'Verification failed', message: error.message },
      { status: 500 }
    );
  }
}
