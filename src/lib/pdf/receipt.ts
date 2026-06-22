import PDFDocument from 'pdfkit';

export interface ReceiptInput {
  receiptNo: string;
  date: string;
  donorName: string;
  donorEmail: string;
  donorPan: string;
  donorAddress: string;
  amount: number;
  paymentMode: string;
  transactionId: string;
  isForeign: boolean;
}

/**
 * Generates an 80G tax receipt PDF for a donation.
 * Returns a Promise that resolves to a binary Buffer.
 */
export function generate80GReceiptPdf(data: ReceiptInput): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const buffers: Buffer[] = [];
      
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Colors
      const primaryColor = '#0d9488'; // Teal
      const secondaryColor = '#475569'; // Slate
      const textColor = '#0f172a'; // Navy

      // Draw top header border accent
      doc.rect(0, 0, doc.page.width, 15).fill(primaryColor);

      // Trust Logo/Name Header
      doc.fontSize(16).fillColor(primaryColor).text('VISHWASHANTHI SHRUSHTI SEVA TRUST', 40, 35, { align: 'left' });
      doc.fontSize(8).fillColor(secondaryColor).text('REGD NO: 2091/2001 (768K IV/2024) | Telangana State, India', 40, 60);

      // Registered Address
      doc.fontSize(8).text('H.No. 2-6-410, Jaipuri Colony, Nagole, Uppal Mandal, Medchal Malkajgiri District, Telangana, India', 40, 72);
      doc.text('Contact: +91 8074589091 | Email: contact@vssevatrust.com', 40, 84);

      // Horizontal separator line
      doc.moveTo(40, 105).lineTo(doc.page.width - 40, 105).strokeColor('#cbd5e1').lineWidth(1).stroke();

      // Section: Receipt title
      doc.fontSize(14).fillColor(textColor).text('DONATION RECEIPT (UNDER SECTION 80G)', 40, 120, { align: 'center', underline: true });

      // Receipt details block
      doc.fontSize(10).fillColor(textColor);
      
      const col1 = 40;
      const col2 = 180;
      const col3 = 300;
      const col4 = 420;

      let y = 160;
      doc.font('Helvetica-Bold').text('Receipt Number:', col1, y);
      doc.font('Helvetica').text(data.receiptNo, col2, y);
      doc.font('Helvetica-Bold').text('Date of Issue:', col3, y);
      doc.font('Helvetica').text(data.date, col4, y);

      y += 20;
      doc.font('Helvetica-Bold').text('Donor Name:', col1, y);
      doc.font('Helvetica').text(data.donorName, col2, y);
      doc.font('Helvetica-Bold').text('Donor PAN / Tax ID:', col3, y);
      doc.font('Helvetica').text(data.donorPan || 'N/A', col4, y);

      y += 20;
      doc.font('Helvetica-Bold').text('Donor Email:', col1, y);
      doc.font('Helvetica').text(data.donorEmail, col2, y);
      doc.font('Helvetica-Bold').text('Country of Residence:', col3, y);
      doc.font('Helvetica').text(data.isForeign ? 'Foreign' : 'India', col4, y);

      y += 20;
      doc.font('Helvetica-Bold').text('Donor Address:', col1, y);
      doc.font('Helvetica').text(data.donorAddress || 'N/A', col2, y, { width: doc.page.width - col2 - 40 });

      // Payment Details Card
      y += 50;
      doc.rect(col1, y, doc.page.width - 80, 70).fillAndStroke('#f8fafc', '#cbd5e1');

      doc.fillColor(textColor);
      doc.font('Helvetica-Bold').fontSize(11).text('Donation Details', col1 + 15, y + 12);
      
      doc.fontSize(10);
      doc.font('Helvetica-Bold').text('Payment Mode:', col1 + 15, y + 32);
      doc.font('Helvetica').text(data.paymentMode.toUpperCase(), col1 + 110, y + 32);
      doc.font('Helvetica-Bold').text('Transaction ID:', col3, y + 32);
      doc.font('Helvetica').text(data.transactionId, col3 + 90, y + 32);

      doc.font('Helvetica-Bold').text('Amount Received:', col1 + 15, y + 50);
      doc.font('Helvetica-Bold').fillColor(primaryColor).text(`INR ${data.amount.toLocaleString('en-IN')}.00`, col1 + 110, y + 50);

      // Statutory Certifications
      y += 100;
      doc.fillColor(secondaryColor).fontSize(8.5);
      doc.font('Helvetica-Bold').text('Statutory Declarations & Trust Certifications:', col1, y);
      y += 15;
      doc.font('Helvetica').text('1. Donations made to VISHWASHANTHI SHRUSHTI SEVA TRUST are exempt from income tax under Section 80G of the Income Tax Act, 1961.', col1, y, { width: doc.page.width - 80 });
      y += 12;
      doc.text('2. Form 10BE will be filed with the Income Tax Department on or before the due date, to ensure tax exemption reflect in your Form 26AS/AIS.', col1, y, { width: doc.page.width - 80 });
      y += 12;
      doc.text('3. This receipt is electronically generated and requires no physical signature under Indian Information Technology Act, 2000.', col1, y, { width: doc.page.width - 80 });

      // Signature Placeholder Box
      y += 60;
      doc.rect(doc.page.width - 180, y, 140, 50).stroke('#cbd5e1');
      doc.fontSize(8).text('Trust Stamp & Signatory', doc.page.width - 175, y + 35, { width: 130, align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
