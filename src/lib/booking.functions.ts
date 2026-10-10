import { createServerFn } from '@tanstack/react-start';
import { bookingSchema } from './booking-schema';

export const submitBooking = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: id, error } = await supabaseAdmin.rpc('submit_booking_request', {
      p_name: data.name, p_email: data.email, p_pathway: data.pathway,
      p_availability: data.availability, p_message: data.message,
    });
    if (error) return { ok: false, message: 'Your request could not be saved. Please wait a few minutes and try again.' };
    return { ok: true, id };
  });