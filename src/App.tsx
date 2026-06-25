import React, { useEffect, useState, useRef } from 'react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
    >
      {children}
    </div>
  );
};

const TextReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="inline-block overflow-hidden align-bottom">
      <span
        className={`inline-block transition-transform duration-700 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
      >
        {children}
      </span>
    </span>
  );
};

const SectionLabel = ({ children, className = "text-text-muted" }: { children: React.ReactNode, className?: string }) => (
  <div className={`font-mono text-sm tracking-widest uppercase mb-6 ${className}`}>
    {children}
  </div>
);

const SectionHeadline = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-display font-medium text-accent-hot leading-tight tracking-[-0.03em] mb-12 max-w-2xl">
    {children}
  </h2>
);

function App() {
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileCTA(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-body overflow-x-hidden">
      
      {/* SECTION 1 - HERO */}
      <section ref={heroRef} className="min-h-[100svh] flex flex-col items-center justify-center px-6 relative max-w-5xl mx-auto py-24">
        <FadeIn className="text-center w-full flex flex-col items-center">
          <div className="font-mono text-sm tracking-widest uppercase text-text-muted mb-8">
            [ WEB ARCHITECT &middot; SILIGURI, WB ]
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-[-0.03em] text-accent-hot mb-8 max-w-4xl mx-auto">
            <TextReveal delay={100}>Your Google Maps rating</TextReveal><br className="hidden md:block" />
            <TextReveal delay={250}>is working hard.</TextReveal><br />
            <span className="font-medium text-accent">
              <TextReveal delay={400}>Your website is losing the sale.</TextReveal>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-text-body leading-relaxed">
            I build Digital Booking Pipelines that turn map traffic into WhatsApp inquiries.<br className="hidden md:block" />
            Under 0.8 seconds. No exceptions.
          </p>
          
          <a href="#contact" className="inline-block border border-text-muted text-accent-hot px-8 py-4 rounded-xl hover:border-accent hover:bg-white/5 transition-all duration-300 font-medium mb-6">
            [ See a Live Demo &rarr; ]
          </a>
          
          <div className="font-mono text-text-muted text-sm">
            avg. load time: 0.74s
          </div>
        </FadeIn>
      </section>

      {/* SECTION 2 - THE PROBLEM */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <FadeIn>
          <SectionLabel className="text-danger-red">THE DIGITAL LEAK</SectionLabel>
          <SectionHeadline>
            High-rated. Invisible online.<br />
            That gap is costing you daily.
          </SectionHeadline>
        </FadeIn>
        
        <div className="space-y-8 max-w-3xl">
          <FadeIn delay={80}>
            <div className="border-l-2 border-text-muted pl-6 py-1">
              <p className="text-lg md:text-xl text-accent">
                "4.8 stars on Google Maps. No website. Customers who searched you at 11PM<br className="hidden md:block" />
                booked your competitor instead."
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={160}>
            <div className="border-l-2 border-text-muted pl-6 py-1">
              <p className="text-lg md:text-xl text-accent">
                "Your last customer found you. The next three couldn't figure out how to contact<br className="hidden md:block" />
                you from their phone. They moved on."
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={240}>
            <div className="border-l-2 border-text-muted pl-6 py-1">
              <p className="text-lg md:text-xl text-accent">
                "A broken WhatsApp link or a 10-second loading page is not a minor issue.<br className="hidden md:block" />
                It is a closed door on your highest-intent traffic."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3 - THE SERVICE */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <FadeIn>
          <SectionLabel>WHAT I BUILD</SectionLabel>
          <SectionHeadline>
            One page. One goal.<br />
            One tap to your WhatsApp.
          </SectionHeadline>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={80} className="h-full">
            <div className="glass-card p-8 h-full hover:-translate-y-1 hover:border-text-muted hover:bg-white/5 transition-all duration-300 flex flex-col">
              <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-wider">Card 1 &mdash; ARCHITECTURE</div>
              <h3 className="text-xl font-display text-accent-hot mb-4">Single-Page Landing Pipeline</h3>
              <p className="text-text-body leading-relaxed flex-grow">
                Built on React with Tailwind. Serverless-deployed on Vercel or Netlify edge nodes. Your customers load it in under 0.8 seconds on a 4G connection in Siliguri. It never crashes. It never goes down.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={160} className="h-full">
            <div className="glass-card p-8 h-full hover:-translate-y-1 hover:border-text-muted hover:bg-white/5 transition-all duration-300 flex flex-col">
              <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-wider">Card 2 &mdash; CONVERSION</div>
              <h3 className="text-xl font-display text-accent-hot mb-4">One CTA. No Confusion.</h3>
              <p className="text-text-body leading-relaxed flex-grow">
                Every element on the page &mdash; the headline, the trust signals, the photos &mdash; points toward a single WhatsApp button. No distractions. No menus. No contact forms that go nowhere.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={240} className="h-full">
            <div className="glass-card p-8 h-full hover:-translate-y-1 hover:border-text-muted hover:bg-white/5 transition-all duration-300 flex flex-col">
              <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-wider">Card 3 &mdash; DEPLOYMENT</div>
              <h3 className="text-xl font-display text-accent-hot mb-4">Linked to Your Google Maps</h3>
              <p className="text-text-body leading-relaxed flex-grow">
                Once live, I connect the site URL directly to your Google Maps business profile. Traffic that finds you on Maps now has a direct, frictionless path to your inbox.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 4 - PROOF */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <FadeIn className="w-full flex flex-col items-center">
          <SectionLabel>NICHES SERVED</SectionLabel>
          <SectionHeadline>
            Built for businesses that earned<br className="hidden md:block" />
            their reputation offline.
          </SectionHeadline>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-4xl">
            {['Private Coaching Centers', 'Polyclinics', 'Dental Clinics', 'Real Estate Agents', 'Specialized Retail'].map((niche) => (
              <span key={niche} className="bg-bg-surface border border-text-muted text-accent font-mono text-sm px-4 py-2 rounded-lg">
                [ {niche} ]
              </span>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-text-body leading-relaxed">
              "All target clients share one profile: 4.5+ stars on Google Maps, 30+ reviews,
              and a digital presence that does not reflect the quality of their actual service.
              That gap is the opportunity I close."
            </p>
          </div>
        </FadeIn>
      </section>

      {/* SECTION 5 - PRICING */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <FadeIn>
          <SectionLabel>INVESTMENT</SectionLabel>
          <SectionHeadline>
            Transparent pricing.<br />
            No retainers. No surprises.
          </SectionHeadline>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FadeIn delay={80}>
            <div className="glass-card p-8 h-full hover:-translate-y-1 hover:border-text-muted hover:bg-white/5 transition-all duration-300">
              <div className="font-mono text-sm text-text-muted uppercase tracking-widest mb-2">ONE-TIME</div>
              <div className="font-mono text-4xl md:text-5xl text-accent-hot mb-6">₹3,000 – ₹5,000</div>
              <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-wider">Card 1 &mdash; SETUP</div>
              <p className="text-text-body leading-relaxed">
                Full design, development, and deployment. Connected to your Google Maps profile. Delivered in 72 hours.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={160}>
            <div className="glass-card p-8 h-full hover:-translate-y-1 hover:border-text-muted hover:bg-white/5 transition-all duration-300">
              <div className="font-mono text-sm text-text-muted uppercase tracking-widest mb-2">ANNUAL</div>
              <div className="font-mono text-4xl md:text-5xl text-accent-hot mb-6">₹1,500 <span className="text-2xl text-text-muted">/ yr</span></div>
              <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-wider">Card 2 &mdash; AMC</div>
              <p className="text-text-body leading-relaxed">
                Domain renewal (.in), server uptime management, and one content update per quarter.
              </p>
            </div>
          </FadeIn>
        </div>
        
        <FadeIn delay={240} className="text-center">
          <p className="font-mono text-text-muted text-sm md:text-base">
            No hidden fees. No monthly retainers. No agency overhead.
          </p>
        </FadeIn>
      </section>

      {/* SECTION 6 - CONTACT / CLOSE */}
      <section id="contact" className="py-24 md:py-32 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <FadeIn className="flex flex-col items-center max-w-2xl">
          <SectionLabel>START HERE</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-accent-hot leading-tight tracking-[-0.03em] mb-8">
            I'll build your site before you decide.
          </h2>
          
          <p className="text-lg text-text-body mb-12 leading-relaxed">
            Send me your Google Maps link. I'll have a live demo in your WhatsApp
            within 48 hours. No commitment required. No invoice until you say yes.
          </p>
          
          <a href="#" className="bg-accent-hot text-bg-primary font-medium px-8 py-5 rounded-xl hover:bg-accent transition-colors duration-300 text-lg mb-8">
            [ Message on WhatsApp &rarr; ]
          </a>
          
          <div className="font-mono text-sm text-text-muted">
            Based in Siliguri, West Bengal &middot; Serving Tier-2 and Tier-3 cities across India
          </div>
        </FadeIn>
      </section>

      {/* THE SIGNATURE ELEMENT (Mobile Fixed CTA) */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 p-4 pb-6 bg-bg-surface/90 backdrop-blur-md border-t border-border-subtle transition-transform duration-500 z-50 ${
          showMobileCTA ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <a href="#contact" className="flex items-center justify-center w-full bg-accent-hot text-bg-primary h-14 rounded-xl font-medium text-base hover:bg-accent transition-colors">
          [ ⚡ Get Your Free Demo &rarr; ]
        </a>
      </div>

    </div>
  );
}

export default App;
