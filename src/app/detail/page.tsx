'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { getProductById, createCart } from "@/lib/shopify";

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

const MCButton = ({ children, className = "", variant = "primary", ...props }: any) => {
  const base =
    "mc-btn font-pixel text-xl px-5 py-3 rounded-xl transition-all duration-200 select-none";
  const variants: Record<string, string> = {
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

const Section = ({ title, subtitle, children }: any) => (
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

const InfoCard = ({ icon, title, desc, color = "orange" }: any) => (
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

const StarRow = ({ value = 5 }: { value?: number }) => (
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
export default function ProductDetailPage() {
  const [shopifyProduct, setShopifyProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Use the global ID format for Shopify
        const productId = "gid://shopify/Product/7471855861863";
        const productData = await getProductById(productId);
        setShopifyProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    if (!shopifyProduct) return;
    
    setIsAddingToCart(true);
    try {
      // Get the first variant ID (assuming simple product)
      const variantId = shopifyProduct.variants.edges[0].node.id;
      const cart = await createCart(variantId, qty);
      
      if (cart && cart.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Based on the homepage vibe: pixel font headings, chill particles, orange highlight.
  const product = useMemo(
    () => {
      // If Shopify data is loaded, use it; otherwise fallback to static data
      const sPrice = shopifyProduct?.variants?.edges[0]?.node?.price?.amount;
      const sCompare = shopifyProduct?.variants?.edges[0]?.node?.compareAtPrice?.amount;
      
      // Dynamic Images from Shopify
      let images = [];
      if (shopifyProduct?.images?.edges?.length > 0) {
        images = shopifyProduct.images.edges.map((edge: any, i: number) => ({
          id: `shopify-img-${i}`,
          label: edge.node.altText || `View ${i + 1}`,
          kind: "shopify", // Generic kind for Shopify images
          url: edge.node.url,
        }));
      } else {
        // Fallback images if Shopify has none (or while loading)
        images = [
          { id: "img1", label: "Front View", kind: "fox-front", url: "https://images.unsplash.com/photo-1627464096076-2d11979b9e59?q=80&w=800&auto=format&fit=crop" },
          { id: "img2", label: "Side Glow", kind: "fox-side", url: "https://images.unsplash.com/photo-1627464096076-2d11979b9e59?q=80&w=800&auto=format&fit=crop" },
          { id: "img3", label: "In Scene", kind: "fox-scene", url: "https://images.unsplash.com/photo-1627464096076-2d11979b9e59?q=80&w=800&auto=format&fit=crop" },
          { id: "img4", label: "Night Mode", kind: "fox-night", url: "https://images.unsplash.com/photo-1627464096076-2d11979b9e59?q=80&w=800&auto=format&fit=crop" },
        ];
      }
      
      return {
        name: shopifyProduct?.title || "Sleeping Fox Light",
        tagline: shopifyProduct?.description || "Illuminate your biome with the coziest mob in the game.",
        price: sPrice ? parseFloat(sPrice) : 29.99,
        compareAt: sCompare ? parseFloat(sCompare) : 49.99,
        rating: 5,
        reviewCount: 342,
        bullets: [
          "Modeled exactly after the in-game fox texture (1:1 scale)",
          "Wireless power via 3x AA batteries for untethered placement",
          "Soft warm orange glow perfect for night mode",
          "Tap to turn on/off - simple and satisfying",
        ],
        highlights: [
          { k: "Material", v: "Durable ABS" },
          { k: "Power", v: "3x AA Battery" },
          { k: "Light Source", v: "Warm LED" },
          { k: "Dimensions", v: "16cm Width" },
        ],
        images,
        specs: [
          { k: "In the Box", v: "1x Sleeping Fox Light, User Manual" },
          { k: "Battery Life", v: "Up to 120 hours of continuous use" },
          { k: "Weight", v: "250g (without batteries)" },
          { k: "Safety", v: "Child-safe materials, cool-to-touch LED" },
          { k: "Warranty", v: "1-year limited warranty" },
        ],
        faqs: [
          {
            q: "Does it make fox sounds?",
            a: "No, this little guy is sleeping peacefully! It's purely a light, so it won't wake you up with squeaks or screeches.",
          },
          {
            q: "Are batteries included?",
            a: "Batteries are not included in the standard box. You'll need 3 standard AA batteries to power it up.",
          },
          {
            q: "Is it bright enough to read by?",
            a: "It's designed as an ambient mood light or nightlight. It provides a cozy orange glow, but we recommend a main lamp for serious reading.",
          },
        ],
        reviews: [
          {
            name: "Steve",
            stars: 5,
            text: "The cutest mob in my inventory. It looks exactly like the game, and the glow is super comforting.",
          },
          {
            name: "Alex",
            stars: 5,
            text: "Perfect for my gaming setup. I love that there are no wires, so I can put it on my shelf anywhere.",
          },
          {
            name: "Builder123",
            stars: 4,
            text: "Great quality plastic, feels sturdy. Wish it had a USB-C option, but batteries last a long time.",
          },
        ],
        related: [
          { name: "Diamond Ore Lamp", price: 24.99, tint: "blue" },
          { name: "Creeper Mug", price: 14.99, tint: "green" },
          { name: "Torch Wall Mount", price: 19.99, tint: "orange" },
        ],
      };
    },
    [shopifyProduct]
  );

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  
  // Update selected image when product images change (e.g. after fetch)
  useEffect(() => {
    if (product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product.images]);

  const [qty, setQty] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(0);

  const mockImage = (img: any) => {
    const base =
      "relative w-full h-full rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm group";
    const badge =
      "absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-200 text-sm z-20";
    const grid =
      "absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:24px_24px] z-10 pointer-events-none";

    // Use the image URL from the object
    const imageUrl = img.url;

    // Only apply filters to fallback images (optional, based on 'kind')
    let filter = "";
    if (img.kind === "fox-front") filter = "brightness-110";
    if (img.kind === "fox-side") filter = "hue-rotate-15 brightness-105";
    if (img.kind === "fox-scene") filter = "sepia-0 brightness-100";
    if (img.kind === "fox-night") filter = "brightness-75 contrast-125 drop-shadow-[0_0_20px_rgba(255,142,37,0.5)]";

    return (
      <div className={base}>
        <div className={grid} />
         <img 
            src={imageUrl} 
            alt={img.label || "Product Image"}
            className={`w-full h-full object-cover transition-all duration-500 ${filter}`}
          />
        
        {/* Overlay for specific variants if needed */}
        {img.kind === "fox-night" && (
             <div className="absolute inset-0 bg-orange-900/30 mix-blend-overlay pointer-events-none" />
        )}

        <div className={badge}>Preview</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans relative bg-[#0f0f13]">
      <GlobalStyles />
      <ParticleSystem />

      {/* Background glow */}
      <div
        className="fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1000px 600px at 20% 20%, rgba(255,142,37,0.15), transparent 60%), radial-gradient(900px 520px at 80% 30%, rgba(59,130,246,0.08), transparent 55%), radial-gradient(900px 520px at 50% 80%, rgba(34,197,94,0.05), transparent 55%)",
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
              <div className="font-pixel text-2xl text-white">VOXELLIGHT</div>
              <div className="text-gray-400 text-sm">Product detail</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MCButton variant="ghost" onClick={() => window.location.href = '/'}>
              ← Home
            </MCButton>
            <MCButton variant="dark" onClick={handleAddToCart} disabled={isAddingToCart}>
              {isAddingToCart ? "..." : `Cart (${qty})`}
            </MCButton>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3]">{mockImage(selectedImage)}</div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img: any) => {
                const active = img.id === selectedImage.id;
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className={`
                      aspect-square rounded-2xl border transition-all duration-300 overflow-hidden relative
                      ${active ? "border-orange-400/70 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"}
                    `}
                    aria-label={`Select ${img.label}`}
                  >
                    <div className="w-full h-full p-2">
                      <div className="w-full h-full rounded-xl overflow-hidden relative">
                         <img 
                            src={img.url} 
                            alt={img.label}
                            className="w-full h-full object-cover"
                          />
                           <div className="absolute inset-0 bg-black/20" />
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
              <Pill>Official Merch</Pill>
              <Pill>In Stock</Pill>
              <Pill>Fast Shipping</Pill>
            </div>

            <h1 className="mt-5 font-pixel text-5xl text-white leading-none">
              {isLoading ? "Loading..." : product.name}
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
                Save ${(product.compareAt - product.price).toFixed(2)}
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
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Loading..." : "Buy Now"}
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
          title="Why this fox shines"
          subtitle="Crafted for comfort, styled for gamers."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InfoCard
              color="orange"
              icon={<span className="font-pixel text-3xl">⚡</span>}
              title="Wireless Power"
              desc="Place it anywhere in your room. No redstone wiring required. 3x AA batteries."
            />
            <InfoCard
              color="blue"
              icon={<span className="font-pixel text-3xl">☾</span>}
              title="Night Mode"
              desc="Emits a soft, warm orange glow perfect for late-night gaming sessions."
            />
            <InfoCard
              color="green"
              icon={<span className="font-pixel text-3xl">▣</span>}
              title="Authentic Detail"
              desc="Modeled exactly after the in-game fox texture. Every pixel counted."
            />
          </div>
        </Section>

        {/* Specs */}
        <Section title="Specs" subtitle="Technical details for the nerds.">
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
        <Section title="Reviews" subtitle="What other miners are saying.">
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
        <Section title="You might also like" subtitle="Complete your setup.">
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
                  className={`${colorClasses[p.tint]} w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300`}
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
          <div className="font-pixel text-2xl text-white">VOXELLIGHT</div>
          <div className="mt-2">Bringing the blocky world into your reality.</div>
        </footer>
      </div>
    </div>
  );
}