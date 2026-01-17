import { 
  Smartphone, 
  CreditCard, 
  Building, 
  Wallet,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const channels = [
  {
    icon: CreditCard,
    title: "Bank Transfer",
    description: "Direct debit from remitter's bank account",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Partner branded online remittance portal",
  },
  {
    icon: Wallet,
    title: "Mobile Wallets",
    description: "Funds credited to digital wallets",
  },
  {
    icon: Building,
    title: "Internet Banking",
    description: "Online banking integration",
  },
];

const Ecosystem = () => {
  return (
    <section id="ecosystem" className="py-24 bg-card relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full">
            Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Payment Ecosystem &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-1">
              Fund Flow
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Multiple access channels connecting to a unified network for seamless 
            cross-border payment processing.
          </p>
        </AnimatedSection>

        {/* Access Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {channels.map((channel, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="text-center p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <channel.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {channel.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {channel.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Connection arrow for mobile */}
        <div className="flex justify-center mb-8 md:hidden">
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </div>

        {/* Flow Diagram */}
        <AnimatedSection animation="scale" delay={400}>
          <div className="relative bg-background rounded-3xl border border-border p-8 md:p-12 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-1/5 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex-1 text-center p-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 group w-full">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-3 group-hover:scale-110 transition-transform">
                  Step 1
                </span>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Customer Initiates</h4>
                <p className="text-muted-foreground text-sm mt-2">
                  Payment via preferred channel
                </p>
              </div>

              {/* Animated Arrow */}
              <div className="hidden md:flex items-center justify-center relative">
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-chart-1" />
                <ArrowRight className="w-8 h-8 text-primary absolute animate-pulse" />
              </div>
              <ChevronDown className="md:hidden w-8 h-8 text-primary animate-bounce" />

              {/* Step 2 */}
              <div className="flex-1 text-center p-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 group w-full">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-3 group-hover:scale-110 transition-transform">
                  Step 2
                </span>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">XDC Network</h4>
                <p className="text-muted-foreground text-sm mt-2">
                  Instant USDC conversion & settlement
                </p>
              </div>

              {/* Animated Arrow */}
              <div className="hidden md:flex items-center justify-center relative">
                <div className="w-16 h-0.5 bg-gradient-to-r from-chart-1 to-chart-2" />
                <ArrowRight className="w-8 h-8 text-primary absolute animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <ChevronDown className="md:hidden w-8 h-8 text-primary animate-bounce" style={{ animationDelay: '0.3s' }} />

              {/* Step 3 */}
              <div className="flex-1 text-center p-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 group w-full">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-3 group-hover:scale-110 transition-transform">
                  Step 3
                </span>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Funds Delivered</h4>
                <p className="text-muted-foreground text-sm mt-2">
                  Credited to receiver in local currency
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Ecosystem;
