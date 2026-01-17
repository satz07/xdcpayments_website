import { 
  Zap, 
  DollarSign, 
  Globe, 
  TrendingDown, 
  Shield, 
  Leaf 
} from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Zap,
    title: "Real-Time Settlement",
    description: "Payments settle in seconds, eliminating delays caused by traditional banking rails.",
  },
  {
    icon: DollarSign,
    title: "Dollar-Stable Payments",
    description: "USDC maintains a 1:1 peg to the U.S. Dollar, ensuring predictable pricing and accounting.",
  },
  {
    icon: Globe,
    title: "Borderless & Always On",
    description: "Send and receive payments globally, 24/7, without intermediaries or geographic limitations.",
  },
  {
    icon: TrendingDown,
    title: "Ultra-Low Transaction Costs",
    description: "XDC's efficient consensus model enables low-fee payments, even at enterprise scale.",
  },
  {
    icon: Shield,
    title: "Secure & Transparent",
    description: "All transactions are recorded on an immutable blockchain, offering full auditability.",
  },
  {
    icon: Leaf,
    title: "Energy-Efficient Network",
    description: "XDC's delegated proof-of-stake design supports sustainable, environmentally responsible payments.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-chart-1/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full">
            Why Choose XDC
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Experience the Power of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-1">
              USDC on XDC
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Combining the stability of a regulated U.S. dollar-backed stablecoin with XDC's 
            fast, low-cost, and enterprise-grade blockchain infrastructure.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection 
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
