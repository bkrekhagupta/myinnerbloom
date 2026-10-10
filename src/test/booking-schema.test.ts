import { describe, expect, it } from 'vitest';
import { bookingSchema } from '@/lib/booking-schema';
const entry = { name: 'Test Visitor', email: 'test@example.com', pathway: 'individual', availability: '', message: '', website: '' };
describe('Discovery-call inquiry validation', () => {
  it('accepts individual coaching inquiries', () => { expect(bookingSchema.parse(entry).pathway).toBe('individual'); });
  it('accepts small-group coaching inquiries', () => { expect(bookingSchema.parse({ ...entry, pathway: 'group' }).pathway).toBe('group'); });
  it('rejects invalid email addresses', () => { expect(bookingSchema.safeParse({ ...entry, email: 'invalid' }).success).toBe(false); });
  it('rejects filled spam traps', () => { expect(bookingSchema.safeParse({ ...entry, website: 'spam' }).success).toBe(false); });
});