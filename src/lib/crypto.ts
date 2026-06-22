import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

// 32-byte encryption key derivation
const encryptionKeyHex = process.env.DATABASE_ENCRYPTION_KEY;
let KEY: Buffer;

if (encryptionKeyHex) {
  KEY = Buffer.from(encryptionKeyHex, 'hex');
} else {
  // Use a fallback static/random key for development builds only.
  console.warn('Warning: DATABASE_ENCRYPTION_KEY missing. Generating a random fallback key.');
  KEY = crypto.scryptSync('development-secret-passphrase', 'salt', 32);
}

/**
 * Encrypts a plaintext string to a Buffer using AES-256-GCM.
 * Buffer format: IV (12 bytes) + AUTH_TAG (16 bytes) + Encrypted Payload
 */
export function encrypt(text: string): Buffer {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]);
}

/**
 * Decrypts a Buffer back to a plaintext string.
 */
export function decrypt(data: Buffer): string {
  const iv = data.subarray(0, 12);
  const tag = data.subarray(12, 28);
  const encrypted = data.subarray(28);

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString('utf8');
}
