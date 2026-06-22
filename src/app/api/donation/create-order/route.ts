import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { razorpayClient } from '@/lib/payments/razorpay';
import { createDonationOrderSchema } from '@/lib/validation';
import { encrypt } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request payload
    const parsed = createDonationOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { amount, currency, programme, frequency, donorDetails } = parsed.data;

    // Encrypt sensitive PII fields
    const encryptedName = encrypt(donorDetails.name);
    const encryptedPhone = donorDetails.phone ? encrypt(donorDetails.phone) : null;
    const encryptedPan = donorDetails.pan ? encrypt(donorDetails.pan) : null;
    const encryptedAddress = donorDetails.address ? encrypt(donorDetails.address) : null;

    // Retrieve IP for DPDP auditing
    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // Transaction to safely create/update Donor and log donation order
    const result = await prisma.$transaction(async (tx) => {
      // Find or create donor (email is unique lookup)
      let donor = await tx.donor.findUnique({
        where: { email: donorDetails.email },
      });

      if (!donor) {
        donor = await tx.donor.create({
          data: {
            name: new Uint8Array(encryptedName),
            email: donorDetails.email,
            phone: encryptedPhone ? new Uint8Array(encryptedPhone) : null,
            pan: encryptedPan ? new Uint8Array(encryptedPan) : null,
            address: encryptedAddress ? new Uint8Array(encryptedAddress) : null,
            country: donorDetails.country,
            is_foreign: donorDetails.country !== 'IN',
            consent_at: new Date(),
            consent_ip: clientIp,
          },
        });
      }

      // Pre-create database donation log in 'pending' status
      const donation = await tx.donation.create({
        data: {
          donor_id: donor.id,
          amount: amount,
          currency: currency,
          programme: programme,
          frequency: frequency,
          gateway: 'razorpay', // Default gateway for MVP API
          gateway_order_id: 'pending_initialization',
          status: 'pending',
        },
      });

      return { donor, donation };
    });

    // Create Razorpay Order
    // Razorpay amount expects value in lowest currency subunit (paise for INR)
    const razorpayOrder = await razorpayClient.orders.create({
      amount: amount * 100, 
      currency: currency,
      receipt: result.donation.id,
      notes: {
        donorId: result.donor.id,
        donationId: result.donation.id,
      },
    });

    // Update database log with the actual gateway Order ID
    await prisma.donation.update({
      where: { id: result.donation.id },
      data: { gateway_order_id: razorpayOrder.id },
    });

    return NextResponse.json({
      orderId: result.donation.id,
      gatewayOrderId: razorpayOrder.id,
      amount: amount,
      currency: currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_51MszEdq44q6w48', // Fallback to a mock key ID for sandbox if not defined
    });
  } catch (error: any) {
    console.error('Donation order creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment order', message: error.message },
      { status: 500 }
    );
  }
}
