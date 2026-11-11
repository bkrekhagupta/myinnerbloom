import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, Check, Leaf, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { bookingSchema } from '@/lib/booking-schema';
import { submitBooking } from '@/lib/booking.functions';

export function BookingDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const submit = useServerFn(submitBooking);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [notificationSent, setNotificationSent] = useState(false);
  const [error, setError] = useState('');
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = bookingSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Please check your details.'); return; }
    setError(''); setStatus('sending');
    try {
      const result = await submit({ data: parsed.data });
      if (!result.ok) { setError(result.message ?? 'Please try again.'); setStatus('idle'); return; }
      setNotificationSent(result.notificationSent);
      setStatus('success');
    } catch { setError('We couldn’t save your request. Please try again.'); setStatus('idle'); }
  }
  return <Dialog open={open} onOpenChange={(value) => { onOpenChange(value); if (!value) { setStatus('idle'); setNotificationSent(false); setError(''); } }}>
    <DialogContent className="booking-modal max-h-[90dvh] overflow-y-auto rounded-lg p-7 sm:p-9">
      <Leaf className="size-7 text-primary" />
      <DialogTitle className="font-display text-3xl leading-tight">{status === 'success' ? 'Your first step, taken.' : 'A conversation. A possibility.'}</DialogTitle>
      <DialogDescription className="leading-relaxed">{status === 'success' ? 'Your discovery-call inquiry has been saved. This is a request, not a confirmed appointment.' : 'Tell Rekha a little about yourself and when you’re available for a free discovery call. No pressure. No obligation.'}</DialogDescription>
      {status === 'success' ? <div className="space-y-6 py-4"><Check className="size-10 text-primary" /><p role="status" className="text-sm text-muted-foreground">{notificationSent ? 'Rekha has been sent your details by email and can reply directly to you.' : 'Your details are saved, but the email alert could not be sent this time. Please try again later or contact Rekha directly.'} There’s no need to have everything figured out. You’ve made space for a new beginning.</p><Button onClick={() => onOpenChange(false)} className="w-full">Back to Inner Bloom</Button></div> : <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2"><label className="form-label">Your name<input required name="name" autoComplete="name" maxLength={100} className="form-input" placeholder="Your name" /></label><label className="form-label">Email address<input required type="email" name="email" autoComplete="email" maxLength={255} className="form-input" placeholder="you@example.com" /></label></div>
        <label className="form-label">What are you drawn to?<select name="pathway" defaultValue="exploring" className="form-input"><option value="exploring">I’m still exploring</option><option value="individual">1:1 individual coaching</option><option value="group">Small-group coaching</option></select></label>
        <label className="form-label">When could we connect? <span className="font-normal text-muted-foreground">(optional)</span><input name="availability" maxLength={500} className="form-input" placeholder="Preferred days, times, and your time zone" /></label>
        <label className="form-label">What brings you here? <span className="font-normal text-muted-foreground">(optional)</span><textarea name="message" maxLength={2000} rows={3} className="form-input resize-y" placeholder="Share only what feels comfortable." /></label>
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-muted-foreground">By sending, you agree that Inner Bloom may contact you about this inquiry. Please avoid sharing sensitive personal details.</p>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button disabled={status === 'sending'} className="h-12 w-full" type="submit">{status === 'sending' ? 'Sending your request…' : 'Request My Free Discovery Call'}<ArrowRight /></Button>
        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="size-3" />A private space. A gentle first step.</p>
      </form>}
    </DialogContent>
  </Dialog>;
}