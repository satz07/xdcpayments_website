import { 
  ArrowRightLeft, 
  Building2, 
  Truck, 
  Wallet, 
  ShoppingCart,
  FileText
} from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const useCases = [
  {
    icon: ArrowRightLeft,
    title: "Cross-Border & Remittances",
    description: "Fast, affordable international money transfers for individuals and businesses.",
    gradient: "from-chart-1 to-primary",
  },
  {
    icon: Building2,
    title: "Enterprise & B2B Payments",
    description: "Streamlined corporate payments with instant settlement and full transparency.",
    gradient: "from-chart-2 to-chart-1",
  },
  {
    icon: Truck,
    title: "Vendor & Supplier Settlements",
    description: "Simplify supply chain payments with smart contract-driven automation.",
    gradient: "from-chart-3 to-chart-2",
  },
  {
    icon: Wallet,
    title: "Treasury & Cash Management",
    description: "Optimize working capital with real-time visibility and instant liquidity.",
    gradient: "from-chart-4 to-chart-3",
  },
  {
    icon: FileText,
    title: "Trade & Supply Chain Payments",
    description: "Invoice-based and milestone payments with smart contract-driven settlements.",
    gradient: "from-chart-5 to-chart-4",
  },
  {
    icon: ShoppingCart,
    title: "Merchant & E-Commerce",
    description: "Accept global payments with low fees and instant confirmation.",
    gradient: "from-primary to-chart-5",
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-24 bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full">
            Use Cases
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Built for{' '}
            <span className="text-primary">
              Real-World Payment Systems
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Designed for efficiency and compliance, USDC on XDC delivers speed, 
            stability, and scalability for enterprise financial workflows.
          </p>
        </AnimatedSection>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <AnimatedSection 
              key={index}
              animation="scale"
              delay={index * 100}
            >
              <div className="relative group overflow-hidden rounded-2xl bg-card border border-border p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                {/* Gradient accent with animation */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${useCase.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${useCase.gradient} opacity-30`} />
                
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.gradient} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <useCase.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
