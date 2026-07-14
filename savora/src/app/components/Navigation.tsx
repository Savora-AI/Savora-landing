import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Problem", href: "#problem" },
  { name: "Product", href: "#features" },
  { name: "Voices", href: "#quotes" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--savora-charcoal)]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.25rem] sm:h-20">
          <Link to="/" className="flex items-center">
            <img src="/assets/savora-logo-white.png" alt="Savora" className="h-11 sm:h-12 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs sm:text-sm uppercase tracking-[0.14em] text-white/50 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#early-access" className="savora-btn !py-3 !px-6 !text-xs sm:!text-sm">
              Join waitlist
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/50 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.06]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#early-access"
                onClick={() => setIsOpen(false)}
                className="savora-btn justify-center !text-sm"
              >
                Join waitlist
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
