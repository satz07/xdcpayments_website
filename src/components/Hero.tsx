import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import FloatingParticles from "./FloatingParticles";
import GlowingOrb from "./GlowingOrb";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-secondary/90" />
      </div>

      {/* Animated Background Elements */}
      <FloatingParticles count={30} />
      <GlowingOrb size="xl" color="primary" position={{ top: '-10%', right: '-10%' }} />
      <GlowingOrb size="lg" color="accent" position={{ bottom: '10%', left: '-5%' }} />
      
      {/* Rotating Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-primary/10 rounded-full animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] border border-primary/5 rounded-full animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8 animate-fade-in-down backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary-foreground text-sm font-medium">
              Powered by XDC Network + USDC
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Cross-Border Payments
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-1 mt-2 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}>
              Made Instant
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '400ms' }}>
            Experience real-time settlement with USDC on XDC Network. 
            Secure, scalable, and future-ready infrastructure for global commerce.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: '600ms' }}>
            <Button size="lg" className="group text-lg px-8 py-6 relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Integration
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-chart-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Zap, value: '<3s', label: 'Settlement Time', delay: 800 },
              { icon: Shield, value: '100%', label: 'Secure & Compliant', delay: 900 },
              { icon: Globe, value: '24/7', label: 'Global Access', delay: 1000 },
            ].map((stat, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-secondary-foreground/5 backdrop-blur-sm border border-secondary-foreground/10 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-secondary-foreground/10 group animate-fade-in-up opacity-0"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <stat.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-3xl font-bold text-secondary-foreground mb-1">{stat.value}</span>
                <span className="text-secondary-foreground/70 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-secondary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
