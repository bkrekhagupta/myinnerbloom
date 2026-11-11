import { useEffect, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DiscoveryCallLink } from './discovery-call-link';
import { BookingDialog } from './booking-dialog';

export function BloomMark() {
  return <svg viewBox="0 0 50 48" fill="none" aria-hidden="true" className="bloom-mark"><path d="M25 35C12 26 15 14 25 4c10 10 13 22 0 31Z" /><path d="M25 36C10 36 5 23 5 16c11 0 18 7 20 20ZM25 36c15 0 20-13 20-20-11 0-18 7-20 20Z" /><path d="M25 39C14 44 4 37 2 29c10-3 19 2 23 10Zm0 0c11 5 21-2 23-10-10-3-19 2-23 10Z" /></svg>;
}

export function BloomShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  useEffect(() => {
    const openBooking = () => setBookingOpen(true);
    window.addEventListener('inner-bloom:book', openBooking);
    return () => window.removeEventListener('inner-bloom:book', openBooking);
  }, []);
  const links = [{ to: '/about' as const, label: 'About' }, { to: '/approach' as const, label: 'Approach' }, { to: '/offerings' as const, label: 'Offerings' }];
  return <><header className="site-header"><div className="page-width flex h-full items-center justify-between gap-5"><Link to="/" aria-label="Inner Bloom home" className="brand"><BloomMark /><div><span className="brand-name">Inner Bloom</span><span className="brand-tagline">GROW WITHIN, BLOOM BEYOND</span></div></Link><nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">{links.map(link => <Button key={link.to} variant="link" asChild className="h-auto p-0 font-normal text-foreground"><Link to={link.to} activeProps={{ className: 'underline underline-offset-8' }}>{link.label}</Link></Button>)}<DiscoveryCallLink className="h-11 px-6" icon={ArrowUpRight}>Book a Call</DiscoveryCallLink></nav><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu}>{menu ? <X /> : <Menu />}</Button></div>{menu && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <Button key={link.to} variant="ghost" asChild><Link to={link.to} onClick={() => setMenu(false)}>{link.label}</Link></Button>)}<DiscoveryCallLink icon={ArrowUpRight} onClick={() => setMenu(false)}>Book a Call</DiscoveryCallLink></nav>}</header><main>{children}</main><footer className="site-footer"><div className="page-width"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-center"><Link to="/" className="brand"><BloomMark /><div><span className="brand-name">Inner Bloom</span><span className="brand-tagline">GROW WITHIN, BLOOM BEYOND</span></div></Link><p className="font-display text-lg italic text-muted-foreground">A safe space to grow within and bloom beyond.</p><nav aria-label="Footer navigation" className="flex gap-6 text-sm">{links.map(link => <Link key={link.to} to={link.to}>{link.label}</Link>)}</nav></div><div className="mt-8 flex flex-col justify-between gap-3 border-t border-border pt-6 text-[11px] text-muted-foreground"><span>© {new Date().getUTCFullYear()} Inner Bloom · Rekha Devi Gupta</span><span>Coaching supports personal growth and is not a substitute for mental health care.</span></div></div></footer><BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} /></>;
}
