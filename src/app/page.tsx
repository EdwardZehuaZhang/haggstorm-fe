"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

// --- Particle System (same vibe as home) ---
const ParticleSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      const size = Math.random() * 6 + 2;
      const duration = Math.random() * 3 + 4;
      const startLeft = Math.random() * 100;

      const colors = ["#ff8e25", "#ffb347", "#ffffff"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        left: ${startLeft}vw;
        bottom: -20px;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: particle-rise ${duration}s linear forwards;
        filter: drop-shadow(0 0 6px rgba(255,142,37,0.35));
      `;

      container.appendChild(particle);

      setTimeout(() => {
        if (container.contains(particle)) container.removeChild(particle);
      }, duration * 1000);
    };

    const intervalId = setInterval(createParticle, 400);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

// --- Global Styles & Fonts (same as home) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=VT323&display=swap');

    .font-sans { font-family: 'Inter', sans-serif; }
    .font-pixel { font-family: 'VT323', monospace; }

    @keyframes particle-rise {
      0% { transform: translateY(0) scale(0); opacity: 0; }
      20% { opacity: 0.6; }
      100% { transform: translateY(-100vh) scale(1); opacity: 0; }
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
      100% { transform: translateY(0px); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }

    /* Minecraft Button Style */
    .mc-btn {
      box-shadow: inset -4px -4px 0px 0px rgba(0,0,0,0.55);
    }
    .mc-btn:active {
      box-shadow: inset 4px 4px 0px 0px rgba(0,0,0,0.55);
      transform: translateY(1px);
    }

    /* Hide number input arrows (nice for qty) */
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] { -moz-appearance: textfield; }
  `}</style>
);

// --- Tiny helpers ---
const colorClasses: Record<string, string> = {
  orange: "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500",
  blue: "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500",
  green: "bg-green-500/10 text-green-500 group-hover:bg-green-500",
};

interface MCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "dark";
}

const MCButton = ({ children, className = "", variant = "primary", ...props }: MCButtonProps) => {
  const base =
    "mc-btn font-pixel text-xl px-5 py-3 rounded-xl transition-all duration-200 select-none";
  const variants = {
    primary:
      "bg-orange-500 text-black hover:bg-orange-400 border border-black/40 hover:-translate-y-0.5",
    ghost:
      "bg-white/5 text-white hover:bg-white/10 border border-white/15 hover:-translate-y-0.5",
    dark:
      "bg-black/40 text-white hover:bg-black/55 border border-white/10 hover:-translate-y-0.5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200 text-sm">
    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
    {children}
  </span>
);

const Section = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <section className="relative z-10 mt-10">
    <div className="flex items-end justify-between gap-6 mb-5">
      <div>
        <h2 className="font-pixel text-3xl text-white">{title}</h2>
        {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
    {children}
  </section>
);

const InfoCard = ({ icon, title, desc, color = "orange" }: { icon: React.ReactNode; title: string; desc: string; color?: string }) => (
  <div
    className={`
      bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl 
      hover:bg-white/10 transition-all duration-500 group hover:-translate-y-1
    `}
  >
    <div
      className={`${colorClasses[color]} w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300`}
    >
      <span className="group-hover:text-black transition-colors duration-300">{icon}</span>
    </div>
    <h3 className="font-pixel text-2xl mb-2 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed font-light">{desc}</p>
  </div>
);

const StarRow = ({ value = 5 }) => (
  <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-xl ${i < value ? "text-orange-400" : "text-white/15"}`}
      >
        ★
      </span>
    ))}
  </div>
);

// --- Product Detail Page ---
const ProductDetailPage = () => {
  // Based on the homepage vibe: pixel font headings, chill particles, orange highlight.
  const product = useMemo(
    () => ({
      name: "Ember Pixel Pack",
      tagline: "Cozy, retro UI kit — with that orange glow.",
      price: 39,
      compareAt: 59,
      rating: 5,
      reviewCount: 214,
      bullets: [
        "Pixel-perfect components (cards, buttons, nav, modals)",
        "Tailwind-first styling + dark-glass aesthetic",
        "Micro-animations + hover states built in",
        "Works great for landing pages, dashboards, and indie launches",
      ],
      highlights: [
        { k: "License", v: "Commercial" },
        { k: "Framework", v: "React" },
        { k: "Style", v: "Tailwind" },
        { k: "Theme", v: "Dark Glass + Pixel" },
      ],
      images: [
        { id: "img1", label: "Hero", kind: "gradient-orange" },
        { id: "img2", label: "Components", kind: "gradient-blue" },
        { id: "img3", label: "Screens", kind: "gradient-green" },
        { id: "img4", label: "Details", kind: "gradient-mono" },
      ],
      specs: [
        { k: "Included", v: "40+ components, 8 page templates, icons, tokens" },
        { k: "Files", v: "JSX + Tailwind classes (no build lock-in)" },
        { k: "Accessibility", v: "Keyboard-friendly states + sensible contrast" },
        { k: "Updates", v: "Free minor updates for 12 months" },
        { k: "Support", v: "Email support (48h typical response)" },
      ],
      faqs: [
        {
          q: "Can I use it in client work?",
          a: "Yep — the commercial license covers client projects. You can ship the final product, but don’t resell the kit itself.",
        },
        {
          q: "Is it compatible with Next.js?",
          a: "Yes. It’s plain React + Tailwind classes, so it drops into Next.js easily.",
        },
        {
          q: "Do I need any extra libraries?",
          a: "No. Animations are CSS-based by default. You can add Framer Motion if you want, but it’s optional.",
        },
      ],
      reviews: [
        {
          name: "Ari",
          stars: 5,
          text: "The hover states are insanely clean. Dropped it into my launch page in an hour.",
        },
        {
          name: "Mei",
          stars: 5,
          text: "The pixel headings + glass cards vibe is exactly what I wanted. Looks premium.",
        },
        {
          name: "Jon",
          stars: 5,
          text: "Spacing, typography, and the little details feel… finished. Worth it.",
        },
      ],
      related: [
        { name: "Pixel Landing Template", price: 19, tint: "orange" },
        { name: "Chill Particle Backgrounds", price: 12, tint: "blue" },
        { name: "Retro UI Icon Set", price: 14, tint: "green" },
      ],
    }),
    []
  );

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [qty, setQty] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(0);

  const mockImage = (kind: string) => {
    const base =
      "relative w-full h-full rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm";
    const badge =
      "absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-200 text-sm";
    const grid =
      "absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:24px_24px]";

    const tint =
      kind === "gradient-orange"
        ? "from-orange-500/30 via-white/5 to-transparent"
        : kind === "gradient-blue"
        ? "from-blue-500/30 via-white/5 to-transparent"
        : kind === "gradient-green"
        ? "from-green-500/30 via-white/5 to-transparent"
        : "from-white/10 via-white/5 to-transparent";

    return (
      <div className={base}>
        <div className={`absolute inset-0 bg-gradient-to-br ${tint}`} />
        <div className={grid} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="font-pixel text-4xl text-white animate-float">
              {product.name}
            </div>
            <div className="text-gray-300 mt-2">{selectedImage.label} Preview</div>
          </div>
        </div>
        <div className={badge}>Preview</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans relative bg-black">
      <GlobalStyles />
      <ParticleSystem />

      {/* Background glow */}
      <div
        className="fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1000px 600px at 20% 20%, rgba(255,142,37,0.18), transparent 60%), radial-gradient(900px 520px at 80% 30%, rgba(59,130,246,0.12), transparent 55%), radial-gradient(900px 520px at 50% 80%, rgba(34,197,94,0.10), transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="font-pixel text-2xl text-orange-400">■</span>
            </div>
            <div>
              <div className="font-pixel text-2xl text-white">Shop</div>
              <div className="text-gray-400 text-sm">Product detail</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MCButton variant="ghost" onClick={() => alert("Hook this to your router: navigate('/')")}>
              ← Back
            </MCButton>
            <MCButton variant="dark" onClick={() => alert("Open cart drawer / checkout")}>
              Cart (2)
            </MCButton>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3]">{mockImage(selectedImage.kind)}</div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img) => {
                const active = img.id === selectedImage.id;
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className={`
                      aspect-square rounded-2xl border transition-all duration-300 overflow-hidden
                      ${active ? "border-orange-400/70 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"}
                    `}
                    aria-label={`Select ${img.label}`}
                  >
                    <div className="w-full h-full p-2">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        {mockImage(img.kind)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buy box */}
          <div
            className="
              bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl
              hover:bg-white/10 transition-all duration-500
            "
          >
            <div className="flex flex-wrap items-center gap-2">
              <Pill>Instant download</Pill>
              <Pill>Commercial use</Pill>
              <Pill>Pixel vibe</Pill>
            </div>

            <h1 className="mt-5 font-pixel text-5xl text-white leading-none">
              {product.name}
            </h1>
            <p className="mt-3 text-gray-300">{product.tagline}</p>

            <div className="mt-5 flex items-center gap-4">
              <StarRow value={product.rating} />
              <div className="text-gray-400">
                {product.rating}.0 · {product.reviewCount} reviews
              </div>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <div className="font-pixel text-5xl text-white">${product.price}</div>
              <div className="text-gray-500 line-through mb-2">${product.compareAt}</div>
              <div className="mb-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-400/20 text-orange-300 text-sm">
                Save ${product.compareAt - product.price}
              </div>
            </div>

            <ul className="mt-6 space-y-2 text-gray-300">
              {product.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-orange-400">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-2xl p-2">
                <button
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                  className="w-16 text-center bg-transparent text-white outline-none font-pixel text-2xl"
                />
                <button
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <MCButton
                className="flex-1"
                onClick={() => alert(`Added to cart: ${product.name} × ${qty}`)}
              >
                Add to Cart
              </MCButton>
            </div>

            <div className="mt-3 flex gap-3">
              <MCButton
                variant="ghost"
                className="flex-1"
                onClick={() => alert("Add to wishlist")}
              >
                ♥ Wishlist
              </MCButton>
              <MCButton
                variant="ghost"
                className="flex-1"
                onClick={() => alert("Share link")}
              >
                ↗ Share
              </MCButton>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {product.highlights.map((h) => (
                <div
                  key={h.k}
                  className="rounded-2xl bg-black/30 border border-white/10 p-4"
                >
                  <div className="text-gray-400 text-sm">{h.k}</div>
                  <div className="text-white font-medium">{h.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature blocks (mirrors homepage card style) */}
        <Section
          title="Why this pack hits"
          subtitle="Same glassy cards + pixel headers aesthetic as the home page."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InfoCard
              color="orange"
              icon={<span className="font-pixel text-3xl">⚡</span>}
              title="Fast drop-in"
              desc="Copy components straight into your project. No heavy setup."
            />
            <InfoCard
              color="blue"
              icon={<span className="font-pixel text-3xl">✦</span>}
              title="Chill motion"
              desc="Hover + micro-animations that feel alive, not loud."
            />
            <InfoCard
              color="green"
              icon={<span className="font-pixel text-3xl">✓</span>}
              title="Consistent UI"
              desc="Spacing, borders, and typography already tuned for a clean look."
            />
          </div>
        </Section>

        {/* Specs */}
        <Section title="Specs" subtitle="What you get in the download.">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="divide-y divide-white/10">
              {product.specs.map((s) => (
                <div key={s.k} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-5">
                  <div className="text-gray-300 font-medium md:col-span-1">{s.k}</div>
                  <div className="text-gray-400 md:col-span-3">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Reviews */}
        <Section title="Reviews" subtitle="Real builder energy.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {product.reviews.map((r, idx) => (
              <div
                key={idx}
                className="
                  bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl
                  hover:bg-white/10 transition-all duration-500
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-pixel text-2xl text-white">{r.name}</div>
                  <StarRow value={r.stars} />
                </div>
                <p className="text-gray-400 mt-3 leading-relaxed">“{r.text}”</p>
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section title="FAQ" subtitle="Quick answers before you buy.">
          <div className="space-y-3">
            {product.faqs.map((f, i) => {
              const open = openFAQ === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpenFAQ(open ? -1 : i)}
                  className="
                    w-full text-left rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                    hover:bg-white/10 transition-all duration-300 p-5
                  "
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-pixel text-2xl text-white">{f.q}</div>
                    <div className="text-gray-300 font-pixel text-3xl">
                      {open ? "−" : "+"}
                    </div>
                  </div>
                  <div
                    className={`text-gray-400 mt-2 leading-relaxed transition-all duration-300 ${
                      open ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {f.a}
                  </div>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Related */}
        <Section title="You might also like" subtitle="Keep the vibe consistent across your site.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {product.related.map((p) => (
              <div
                key={p.name}
                className="
                  bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl
                  hover:bg-white/10 transition-all duration-500 group hover:-translate-y-1
                "
              >
                <div
                  className={`${colorClasses[p.tint || "orange"]} w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300`}
                >
                  <span className="group-hover:text-black transition-colors duration-300 font-pixel text-3xl">
                    ▣
                  </span>
                </div>
                <div className="font-pixel text-2xl text-white">{p.name}</div>
                <div className="text-gray-400 mt-1">${p.price}</div>
                <div className="mt-4">
                  <MCButton
                    variant="ghost"
                    className="w-full"
                    onClick={() => alert(`Open product: ${p.name}`)}
                  >
                    View
                  </MCButton>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="mt-14 pb-6 text-center text-gray-500">
          <div className="font-pixel text-2xl text-white">Ember UI</div>
          <div className="mt-2">Built with glass, pixels, and chill particles.</div>
        </footer>
      </div>
    </div>
  );
};

// If you want it to replace your homepage App for now:
export default function App() {
  return <ProductDetailPage />;
}
