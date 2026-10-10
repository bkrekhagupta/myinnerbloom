import { createFileRoute } from '@tanstack/react-router';
import { BloomShell } from '@/components/bloom-shell';
import { OfferingsSection, DiscoverySection } from '@/components/bloom-sections';
import { pageMeta } from '@/lib/page-meta';
export const Route = createFileRoute('/offerings')({ head: () => pageMeta('Individual & Small-Group Coaching — Inner Bloom', 'Find your Inner Bloom coaching pathway: personalised 1:1 mindset coaching or reflective small-group coaching. Begin with a free discovery call.'), component: Offerings });
function Offerings() { return <BloomShell>{onBook => <><div className="subpage-heading"><p className="eyebrow">SPACE FOR YOUR NEXT CHAPTER</p><h1 className="section-heading">Find the path that feels like you.</h1></div><OfferingsSection onBook={onBook} /><DiscoverySection onBook={onBook} /></>}</BloomShell>; }