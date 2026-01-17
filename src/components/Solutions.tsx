import { Check } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import GlowingOrb from "./GlowingOrb";

const highlights = [
  "Supports Cross Border Payments and Domestic settlements",
  "100% Secure & Compliant",
  "Better Business Margins, with lower cost to customers",
  "Integrates with SWIFT Network",
  "Supports Deferred Payments",
  "Makes Micro payments non expensive",
  "Provides access to Liquidity",
  "Future-first Offering",
  "ISO20022 Messaging + MLETR Compliant",
];

const Solutions = () => {
  return (
    <section id="solutions" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background decorations */}
      <GlowingOrb size="lg" color="primary" position={{ top: '10%', right: '5%' }} className="opacity-20" />
      <GlowingOrb size="md" color="accent" position={{ bottom: '20%', left: '0%' }} className="opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <AnimatedSection animation="fade-right">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full">
              XDC for Payments
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mt-4 mb-6">
              Solving Cross-Border{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-1">
                Payment Challenges
              </span>
            </h2>
            <p className="text-secondary-foreground/80 text-lg mb-8">
              Traditional cross-border payments face challenges with pricing, 
              liquidity management, and expensive micro-payments. 
              XDC for Payments is here to solve this and more.
            </p>
            
            {/* Challenges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { num: "01", title: "Pricing", desc: "Competitive rates" },
                { num: "02", title: "Acquiring", desc: "Easy onboarding" },
                { num: "03", title: "Liquidity", desc: "Instant access" },
                { num: "04", title: "Micro Payments", desc: "Low-cost small transfers" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10 hover:border-primary/30 hover:bg-secondary-foreground/10 transition-all duration-300 group cursor-pointer"
                >
                  <span className="text-primary font-bold text-sm group-hover:scale-110 inline-block transition-transform">{item.num}</span>
                  <h4 className="text-secondary-foreground font-semibold mt-1 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-secondary-foreground/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right Content - Highlights */}
          <AnimatedSection animation="fade-left" delay={200}>
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-border">
              <h3 className="text-2xl font-bold text-card-foreground mb-8">
                Key Highlights
              </h3>
              <ul className="space-y-4">
                {highlights.map((highlight, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 group cursor-pointer"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Check className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="text-card-foreground group-hover:text-primary transition-colors duration-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
