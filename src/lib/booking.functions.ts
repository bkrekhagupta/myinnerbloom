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

    let notificationSent = false;
    try {
      const gatewayUrl = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1';
      const gatewayKey = process.env['LOVABLE_API_KEY'];
      const gmailKey = process.env['GOOGLE_MAIL_API_KEY'];
      if (!gatewayKey || !gmailKey) throw new Error('Gmail connection credentials are unavailable.');

      const pathwayLabels = { individual: '1:1 individual coaching', group: 'Small-group coaching', exploring: 'Still exploring' };
      const body = [
        'A new Inner Bloom discovery-call request was received.',
        '',
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Coaching pathway: ${pathwayLabels[data.pathway]}`,
        `Availability: ${data.availability || 'Not provided'}`,
        `What brings them here: ${data.message || 'Not provided'}`,
        `Request reference: ${id}`,
      ].join('\n');
      const base64 = (bytes: Uint8Array) => btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''));
      const bodyBase64 = base64(new TextEncoder().encode(body));
      const rawMessage = [
        'To: bkrekhagupta@gmail.com',
        `Reply-To: ${data.email}`,
        'Subject: New Inner Bloom discovery-call request',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset="UTF-8"',
        'Content-Transfer-Encoding: base64',
        '',
        bodyBase64,
      ].join('\r\n');
      const raw = base64(new TextEncoder().encode(rawMessage)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const response = await fetch(`${gatewayUrl}/users/me/messages/send`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${gatewayKey}`,
          'X-Connection-Api-Key': gmailKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw }),
      });
      if (!response.ok) {
        const detail = await response.text();
        console.error(`Gmail booking notification failed [${response.status}]: ${detail}`);
      } else {
        notificationSent = true;
      }
    } catch (notificationError) {
      console.error('Gmail booking notification failed:', notificationError);
    }

    return { ok: true, id, notificationSent };
  });