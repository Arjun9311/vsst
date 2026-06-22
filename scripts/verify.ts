import fs from 'fs';
import path from 'path';
import { encrypt, decrypt } from '../src/lib/crypto';
import { generate80GReceiptPdf, ReceiptInput } from '../src/lib/pdf/receipt';
import { createDonationOrderSchema } from '../src/lib/validation';

async function runVerification() {
  console.log('=== STARTING PLATFORM VERIFICATION TEST ===\n');

  // Test 1: Cryptographic PII Encryption / Decryption
  console.log('Test 1: Verification of PII Encryption & Decryption...');
  const testPan = 'ABCDE1234F';
  const encrypted = encrypt(testPan);
  const decrypted = decrypt(encrypted);

  if (testPan === decrypted) {
    console.log('✔ PASS: Encryption/Decryption roundtrip successful.');
    console.log(`  - Original:  ${testPan}`);
    console.log(`  - Encrypted: <Buffer ${encrypted.subarray(0, 10).toString('hex')}... (${encrypted.length} bytes)>`);
    console.log(`  - Decrypted: ${decrypted}\n`);
  } else {
    throw new Error('FAIL: Decrypted string mismatch!');
  }

  // Test 2: Validation Schemas using Zod
  console.log('Test 2: Validation of Schema Constraints (Zod)...');
  const invalidPayload = {
    amount: 50, // Minimum is ₹100
    currency: 'INR',
    programme: 'invalid_category',
    frequency: 'one_time',
    donorDetails: {
      name: 'A', // Too short
      email: 'bademail', // Invalid email format
      pan: '12345', // Bad PAN format
      country: 'IN',
      consent: false, // Must be true
    },
  };

  const validationResult = createDonationOrderSchema.safeParse(invalidPayload);
  if (!validationResult.success) {
    console.log('✔ PASS: Rejected invalid payload as expected.');
    const errors = validationResult.error.flatten().fieldErrors;
    console.log('  Captured Errors:', JSON.stringify(errors, null, 2), '\n');
  } else {
    throw new Error('FAIL: Validation schema approved an invalid payload!');
  }

  // Test 3: PDF Generation
  console.log('Test 3: Generating Sample 80G PDF Receipt...');
  const mockReceiptData: ReceiptInput = {
    receiptNo: 'REC-2026-06-22-001',
    date: '22-Jun-2026',
    donorName: 'Arjun Rao',
    donorEmail: 'arjun@example.com',
    donorPan: 'ABCDE1234F',
    donorAddress: 'H.No. 12-34, Gachibowli, Hyderabad, Telangana - 500032',
    amount: 2200,
    paymentMode: 'upi',
    transactionId: 'txn_upi_2026_06_22_xyz',
    isForeign: false,
  };

  try {
    const pdfBuffer = await generate80GReceiptPdf(mockReceiptData);
    
    // Ensure scripts directory exists
    const artifactsDir = path.join(__dirname, '..', 'artifacts');
    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }

    const outputPath = path.join(artifactsDir, 'sample_receipt.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`✔ PASS: Receipt PDF generated successfully.`);
    console.log(`  - File Output: ${outputPath}`);
    console.log(`  - File Size:   ${(pdfBuffer.length / 1024).toFixed(2)} KB\n`);
  } catch (error) {
    console.error('FAIL: PDF generation failed!', error);
    throw error;
  }

  console.log('=== ALL AUTOMATED VERIFICATION TESTS PASSED ===');
}

runVerification().catch((err) => {
  console.error('Verification suite failed:', err);
  process.exit(1);
});
