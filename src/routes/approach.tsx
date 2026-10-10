import { createFileRoute } from '@tanstack/react-router';
import { BloomShell } from '@/components/bloom-shell';
import { FeelSeen, ApproachSection, DiscoverySection } from '@/components/bloom-sections';
import { pageMeta } from '@/lib/page-meta';
export const Route = createFileRoute('/approach')({ head: () => pageMeta('Our Mindset Coaching Approach — Inner Bloom', 'Explore how compassionate awareness, intentional reframing, and conscious action can help you understand your patterns and find your way forward.'), component: Approach });
function Approach() { return <BloomShell>{onBook => <><div className="subpage-heading"><p className="eyebrow">AWARENESS · PERSPECTIVE · POSSIBILITY</p><h1 className="section-heading">Change begins with understanding.</h1></div><ApproachSection /><FeelSeen /><DiscoverySection onBook={onBook} /></>}</BloomShell>; }