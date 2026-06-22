import { z } from 'zod';

export const createDonationOrderSchema = z.object({
  amount: z.number().min(100, 'Minimum donation amount is ₹100'),
  currency: z.enum(['INR', 'USD']),
  programme: z.enum(['shelter', 'education', 'food', 'childcare', 'general']),
  frequency: z.enum(['one_time', 'monthly', 'yearly']),
  donorDetails: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(120),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional().nullable(),
    pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g. ABCDE1234F)').optional().nullable(),
    address: z.string().optional().nullable(),
    country: z.string().length(2, 'Country must be a 2-letter ISO code'),
    consent: z.literal(true, {
      message: 'DPDP consent is mandatory to process data',
    }),
  }),
});

export const contactSubmissionSchema = z.object({
  formType: z.enum(['general', 'admission', 'media', 'partnership']),
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  consent: z.literal(true, {
    message: 'DPDP consent is mandatory to process data',
  }),
});

export const volunteerRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional().nullable(),
  city: z.string().min(2, 'City must be at least 2 characters').max(60),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  availability: z.object({
    days: z.array(z.string()).min(1, 'Please select at least one day'),
    hours_per_week: z.number().min(1, 'Minimum 1 hour per week required'),
  }),
  consent: z.literal(true, {
    message: 'DPDP consent is mandatory to process data',
  }),
});

export const admissionEnquirySchema = z.object({
  guardianName: z.string().min(2, 'Guardian name must be at least 2 characters').max(120),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  childName: z.string().optional().nullable(),
  childAge: z.number().min(4, 'Minimum age is 4').max(12, 'Maximum age is 12'),
  situation: z.string().min(10, 'Please describe the child\'s situation (min 10 chars)').max(2000),
  consent: z.literal(true, {
    message: 'DPDP consent is mandatory to process data',
  }),
});
