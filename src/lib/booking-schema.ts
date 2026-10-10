import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(255),
  pathway: z.enum(['individual', 'group', 'exploring']),
  availability: z.string().trim().max(500),
  message: z.string().trim().max(2000),
  website: z.string().max(0),
});