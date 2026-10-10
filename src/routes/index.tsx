import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BloomShell } from '@/components/bloom-shell';
import { FeelSeen, ApproachSection, OfferingsSection, AboutSection, DiscoverySection } from '@/components/bloom-sections';
import { pageMeta } from '@/lib/page-meta';
import sanctuary from '@/assets/inner-bloom-sanctuary.jpg';

export const Route = createFileRoute('/')({
  head: () => pageMeta('Inner Bloom — Come Home to Yourself', 'Transformational mindset coaching with Rekha Devi Gupta. Understand your patterns, reframe your stories, and grow at your own pace.'),
  component: Index,
});

function Index() {
  return <BloomShell>{onBook => <>
    <section className="hero" aria-labelledby="hero-title">
      <img src={sanctuary} alt="" className="hero-image" width={1920} height={1024} fetchPriority="high" />
      <div className="page-width hero-content"><p className="eyebrow">INNER BLOOM · TRANSFORMATIONAL MINDSET COACHING</p>
        <h1 id="hero-title" className="hero-title">Come Home<br />to <em>Yourself.</em></h1>
        <p className="hero-subtitle">Understand the stories that shape you.<br />Discover the freedom to write a new one.</p>
        <p className="hero-body">A safe space to explore your inner patterns, gently question the beliefs that hold you back, and create a life aligned with who you truly want to be.</p>
        <div className="hero-actions"><Button onClick={onBook} className="h-12 px-6 text-xs">Book a Free Discovery Call<ArrowRight /></Button><Button asChild variant="outline" className="h-12 border-primary/30 bg-background/30 px-5 text-xs shadow-none"><Link to="/approach">Explore Your Inner Bloom<ArrowRight /></Link></Button></div>
        <p className="hero-reassurance">A space for honest reflection, clarity, and meaningful change<br className="hidden md:block" /> — at your own pace.</p>
      </div><ChevronDown aria-hidden="true" className="hero-bottom size-4" />
    </section>
    <FeelSeen /><ApproachSection /><OfferingsSection onBook={onBook} /><AboutSection /><DiscoverySection onBook={onBook} />
  </>}</BloomShell>;
}
