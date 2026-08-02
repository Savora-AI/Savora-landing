import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sun, ListChecks, TrendingDown, Mail, Phone, Copy, Check } from "lucide-react";
import { ConvergenceSection } from "./ConvergenceSection";
import { MeshBackground } from "./MeshBackground";
import { HeroAmbient } from "./HeroAmbient";
import { RestaurantAmbience } from "./RestaurantAmbience";
import { QuotesSection } from "./QuotesSection";

const TOP_FEATURES = [
  {
    num: "01",
    icon: Sun,
    title: "Daily Briefing",
    tagline: "Know your day before service starts",
    description:
      "Every morning (or afternoon), Savora gives you one clear snapshot: how yesterday compared to your average, how busy today should be, what the weather and local events mean for covers, and what needs your attention right now — low stock, review issues, staffing gaps, and pending decisions. No clicking through five apps. You open Savora and know what kind of day you're walking into.",
  },
  {
    num: "02",
    icon: ListChecks,
    title: "Decision Queue",
    tagline: "Approve the right moves in one tap",
    description:
      "Savora doesn't just show problems — it recommends what to do. Reorder inventory before you 86 a bestseller. Adjust staffing before a rush. Flag food variance before margin leaks. Catch review spikes before they hit Google. Each recommendation comes with the situation, the reasoning, and concrete actions. You approve or dismiss in seconds.",
  },
  {
    num: "03",
    icon: TrendingDown,
    title: "Food Analysis",
    tagline: "Find where margin is really going",
    description:
      "Savora connects every sale to every ingredient. It compares what you should have used vs. what actually left the kitchen — so you catch over-portioning, waste, and tracking gaps shift by shift, not at month-end. You see which items are risky, which staff were on duty, and what to fix before it becomes lost profit.",
  },
];

const OTHER_FEATURES = [
  {
    title: "Forecast & Prep",
    description:
      "Predicts tonight's covers from your history, weather, and day-of-week patterns — then turns that into a prep list and purchase guidance.",
  },
  {
    title: "Inventory",
    description:
      "Live stock levels with critical/low/in-stock status, days until reorder, and one-tap reorders when something's running out.",
  },
  {
    title: "Guest Experience",
    description:
      "Reviews and table pacing in one place: ratings, negative clusters, slow vs. rushed service, and server performance.",
  },
  {
    title: "Staff Analysis",
    description:
      "See who's performing today — revenue, covers, pacing, review averages, and coaching flags.",
  },
  {
    title: "Finances",
    description:
      "Food cost, labor, overhead, and net margin in plain numbers with targets and trends.",
  },
  {
    title: "Ask Savora",
    description:
      "Ask anything in plain English — \"How did we do yesterday?\", \"What should I prep Saturday?\" — from your real data.",
  },
  {
    title: "Menu",
    description:
      "Your menu powers everything downstream: forecasting, prep, food cost, and variance — one source of truth.",
  },
];

export function Home() {
  const [email, setEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormMessage("Please enter a valid email.");
      return;
    }

    setSubmitting(true);
    setFormMessage("");

    try {
      const endpoint = import.meta.env.VITE_WAITLIST_URL || "/api/waitlist";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Request failed");

      setFormMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setFormMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[4.25rem] sm:pt-20">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <MeshBackground variant="decide" />
        <HeroAmbient />
        <RestaurantAmbience />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="savora-label mb-6">Independent restaurants</p>
              <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white leading-[1.06] tracking-tight mb-8 font-medium">
                Stop guessing.
                <br />
                <span className="savora-text-gradient italic font-normal">Start deciding.</span>
              </h1>
              <p className="savora-body max-w-xl mb-10">
                Savora is restaurant software built for independent operators — the operating brain
                that watches your sales, inventory, staff, and guests, then tells you what to do
                before problems cost you money.
              </p>
              <a href="#early-access" className="savora-btn">
                Join the waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.25 }}
              className="flex justify-center items-center mt-12 lg:mt-0"
            >
              <motion.img
                src="/assets/savora-logo-white.png"
                alt="Savora"
                className="w-full max-w-sm sm:max-w-lg lg:max-w-3xl opacity-95"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="relative py-24 md:py-32 border-t border-white/[0.06] overflow-hidden" id="problem">
        <MeshBackground variant="charcoal" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 max-w-3xl">
              <p className="savora-label mb-4">The problem</p>
              <h2 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl text-white leading-tight mb-6 font-medium">
                You run a restaurant.
                <br />
                <span className="text-white/40 italic font-normal">Not a data center.</span>
              </h2>
              <p className="savora-body">
                Margins are thin. Tools are fragmented. POS, inventory, scheduling, and reviews don't
                talk to each other — and none of them tell you what to do next. You're left digging
                through dashboards when you should be on the floor.
              </p>
            </div>

            <div className="hidden lg:block lg:col-span-5 relative h-[min(28rem,55vh)]">
              <HeroAmbient variant="side" />
            </div>
          </div>
        </div>
      </section>

      <ConvergenceSection />

      <QuotesSection />

      {/* Top 3 Features */}
      <section className="relative py-28 border-t border-white/[0.06] overflow-hidden" id="features">
        <MeshBackground variant="subtle" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="savora-label mb-4">Product</p>
          <h2 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl text-white mb-16 md:mb-20 max-w-2xl leading-tight font-medium">
            Built for operators, not analysts.
          </h2>

          <div className="space-y-24 md:space-y-32">
            {TOP_FEATURES.map((feature) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-display text-5xl text-white/20">{feature.num}</span>
                    <feature.icon className="w-6 h-6 text-[var(--savora-blue)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[1.75rem] sm:text-4xl md:text-5xl text-white mb-3 font-medium">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--savora-lavender)]/85 text-base md:text-lg tracking-wide">{feature.tagline}</p>
                </div>
                <div className="lg:col-span-8">
                  <p className="savora-body">{feature.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Other features */}
      <section className="relative py-24 border-t border-white/[0.06] overflow-hidden">
        <MeshBackground variant="charcoal" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="savora-label mb-12">Everything else</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {OTHER_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-white/[0.08] pt-6"
              >
                <h4 className="font-display text-xl md:text-2xl text-white mb-3 font-medium">{feature.title}</h4>
                <p className="text-base md:text-lg text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center py-28 border-t border-white/[0.06]"
        id="early-access"
      >
        <MeshBackground variant="subtle" />
        <div className="relative text-center px-6 w-full max-w-md mx-auto">
          <img
            src="/assets/savora-logo-white.png"
            alt="Savora"
            className="h-32 md:h-36 mx-auto mb-10 opacity-90"
          />
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4 font-medium">Early access</h2>
          <p className="text-base md:text-lg text-white/50 mb-10">
            Join the waitlist. We're onboarding independent operators first.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@restaurant.com"
              className="flex-1 px-4 py-4 bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 text-base outline-none focus:border-[var(--savora-lavender)]/40 transition-colors backdrop-blur-sm"
              required
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting}
              className="savora-btn justify-center whitespace-nowrap disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Request access"}
            </button>
          </form>
          {formMessage && (
            <p
              className={`mt-4 text-sm ${
                formMessage.includes("list") ? "text-[var(--savora-lavender)]" : "text-red-400/80"
              }`}
            >
              {formMessage}
            </p>
          )}
        </div>
      </section>

      <footer className="border-t border-white/[0.06] pt-16 pb-12 savora-footer-wash relative overflow-hidden" id="contact">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Get in Touch Section */}
          <div className="mb-16 pb-16 border-b border-white/[0.06]">
            <div className="max-w-3xl">
              <p className="savora-label mb-3">Contact Us</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 font-medium">
                Get in Touch
              </h2>
              <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light">
                Let's build the future of restaurant operations, together.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                {/* Email Card */}
                <div className="group relative flex items-center gap-3 px-5 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[var(--savora-lavender)]/40 transition-all duration-300 backdrop-blur-md">
                  <Mail className="w-5 h-5 text-[var(--savora-lavender)] shrink-0" />
                  <a
                    href="mailto:info@platd-ai.com"
                    className="text-base sm:text-lg text-white/90 hover:text-white font-medium transition-colors"
                  >
                    info@platd-ai.com
                  </a>
                  <button
                    onClick={() => copyToClipboard("info@platd-ai.com", "email")}
                    className="ml-2 p-1.5 text-white/40 hover:text-white/90 transition-colors focus:outline-none"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  {copiedEmail && (
                    <span className="absolute -top-8 right-2 text-xs bg-[var(--savora-surface)] text-[var(--savora-lavender)] px-2 py-1 border border-white/10 shadow-lg">
                      Copied!
                    </span>
                  )}
                </div>

                {/* Phone Card */}
                <div className="group relative flex items-center gap-3 px-5 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[var(--savora-lavender)]/40 transition-all duration-300 backdrop-blur-md">
                  <Phone className="w-5 h-5 text-[var(--savora-blue)] shrink-0" />
                  <a
                    href="tel:5852307406"
                    className="text-base sm:text-lg text-white/90 hover:text-white font-medium transition-colors"
                  >
                    (585) 230-7406
                  </a>
                  <button
                    onClick={() => copyToClipboard("(585) 230-7406", "phone")}
                    className="ml-2 p-1.5 text-white/40 hover:text-white/90 transition-colors focus:outline-none"
                    title="Copy phone number"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  {copiedPhone && (
                    <span className="absolute -top-8 right-2 text-xs bg-[var(--savora-surface)] text-[var(--savora-lavender)] px-2 py-1 border border-white/10 shadow-lg">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <img
              src="/assets/savora-logo-white.png"
              alt="Savora restaurant software logo"
              className="h-11 opacity-70"
            />
            <p className="text-sm text-white/35 tracking-wide text-center md:text-right max-w-md">
              © 2026 Savora. Restaurant management software for independent restaurants —
              inventory, staffing, food cost, and daily decisions in one place.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

