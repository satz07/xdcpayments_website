import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    label: "Features",
    href: "#features"
  }, {
    label: "Use Cases",
    href: "#use-cases"
  }, {
    label: "Solutions",
    href: "#solutions"
  }, {
    label: "Ecosystem",
    href: "#ecosystem"
  }];
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg' : 'bg-transparent border-b border-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <span className="text-primary-foreground font-bold text-lg">X</span>
          </div>
          <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">XDC Network</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => <a key={link.label} href={link.href} className="relative text-muted-foreground hover:text-foreground transition-colors font-medium py-2 group" style={{
          animationDelay: `${index * 100}ms`
        }}>
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>)}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="hover:bg-primary/10 transition-all duration-300">
            Contact
          </Button>
          <Button className="relative overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-chart-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="relative w-6 h-6">
            <Menu className={`absolute inset-0 w-6 h-6 text-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
            <X className={`absolute inset-0 w-6 h-6 text-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-background/95 backdrop-blur-lg border-t border-border overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link, index) => <a key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300 font-medium py-3 px-4 rounded-lg" onClick={() => setIsMenuOpen(false)} style={{
          animationDelay: `${index * 50}ms`,
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
          opacity: isMenuOpen ? 1 : 0,
          transition: `all 0.3s ease ${index * 50}ms`
        }}>
              {link.label}
            </a>)}
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start">Contact</Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </nav>
      </div>
    </header>;
};
export default Header;