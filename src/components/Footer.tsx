import { 
  Twitter, 
  Linkedin, 
  Github, 
  MessageCircle 
} from "lucide-react";
import logoLight from "@/assets/xdc-payments-logo-light.svg";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Use Cases", "Pricing", "API Docs"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Documentation", "Support", "Community", "Partners"],
    Legal: ["Privacy Policy", "Terms of Service", "Compliance"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: MessageCircle, href: "#", label: "Discord" },
  ];

  return (
    <footer className="bg-secondary pt-16 pb-8 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 group cursor-pointer">
              <img 
                src={logoLight} 
                alt="Payenst Logo" 
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            <p className="text-secondary-foreground/70 text-sm mb-6 max-w-xs">
              Enabling real-time cross-border payments with USDC on XDC Network.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 text-secondary-foreground/70 hover:text-primary-foreground group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-secondary-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm relative inline-block group"
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              © {new Date().getFullYear()} XOC Network. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-secondary-foreground/60 text-sm hover:text-primary transition-colors cursor-pointer">
                ISO20022 Compliant
              </span>
              <span className="text-secondary-foreground/60 text-sm hover:text-primary transition-colors cursor-pointer">
                MLETR Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
