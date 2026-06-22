import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  contactSubmissionSchema,
  volunteerRegistrationSchema,
} from '@/lib/validation';
import { encrypt } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const formType = body.formType || body.form_type;

    // Handle Volunteer registrations separately
    if (body.skills || body.availability) {
      const parsed = volunteerRegistrationSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Validation failed', details: parsed.error.format() },
          { status: 400 }
        );
      }

      const { name, email, phone, city, skills, availability } = parsed.data;

      // Encrypt sensitive PII
      const encryptedEmail = encrypt(email);
      const encryptedPhone = phone ? encrypt(phone) : null;

      const volunteer = await prisma.volunteer.create({
        data: {
          name,
          email: new Uint8Array(encryptedEmail),
          phone: encryptedPhone ? new Uint8Array(encryptedPhone) : null,
          city,
          skills,
          availability: availability as any, // Cast as availability is Prisma Json
          status: 'pending',
          consent_at: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Volunteer registration submitted successfully',
        id: volunteer.id,
      });
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
  } catch (error: any) {
    console.error('Contact submission failed:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry submission', message: error.message },
      { status: 500 }
    );
  }
}
