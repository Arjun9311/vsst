import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  contactSubmissionSchema,
} from '@/lib/validation';
import { encrypt } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }



    // Handle general inquiries & admissions enquiries
    const parsed = contactSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, message, formType: parsedType } = parsed.data;

    // Encrypt sensitive PII
    const encryptedEmail = encrypt(email);
    const encryptedPhone = phone ? encrypt(phone) : null;

    const contactSubmission = await prisma.contactSubmission.create({
      data: {
        form_type: parsedType,
        name,
        email: new Uint8Array(encryptedEmail),
        phone: encryptedPhone ? new Uint8Array(encryptedPhone) : null,
        message,
        status: 'new',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: contactSubmission.id,
    });
  } catch (error) {
    console.error('Contact submission failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process inquiry submission', message: errorMessage },
      { status: 500 }
    );
  }
}
