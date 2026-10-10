import { createFileRoute } from '@tanstack/react-router';
import { BloomShell } from '@/components/bloom-shell';
import { AboutSection, DiscoverySection } from '@/components/bloom-sections';
import { pageMeta } from '@/lib/page-meta';
export const Route = createFileRoute('/about')({ head: () => pageMeta('Meet Rekha Devi Gupta — Inner Bloom', 'Meet the founder of Inner Bloom and discover her grounded, reflective approach to transformational mindset coaching.'), component: About });
function About() { return <BloomShell>{onBook => <><div className="subpage-heading"><p className="eyebrow">THE PERSON BEHIND INNER BLOOM</p><h1 className="section-heading">A thoughtful partner in your growth.</h1></div><AboutSection /><DiscoverySection onBook={onBook} /></>}</BloomShell>; }