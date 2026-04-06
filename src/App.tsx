import { useEffect, useRef, useState } from 'react';
import { CircularGallery, GalleryItem } from './components/ui/circular-gallery';
import {
  Users,
  Target,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  Award,
  BookOpen,
  Globe,
  ShieldCheck,
  Globe2,
  Zap,
  Rocket,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
  Send,
} from 'lucide-react';
import Hero from '@/src/components/ui/animated-shader-hero';
import InteractiveSelector from '@/src/components/ui/interactive-selector';

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewState =
  | 'main'
  | 'youth'
  | 'development'
  | 'governance'
  | 'welfare'
  | 'infrastructure'
  | 'peace'
  | 'pillar-integrity'
  | 'pillar-unity'
  | 'pillar-progress'
  | 'pillar-legacy'
  | 'journey-roots'
  | 'journey-service'
  | 'journey-vision'
  | 'contact';

// ─── Inline CSS (injected once) ───────────────────────────────────────────────

const globalStyles = `
  @keyframes float-subtle {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-10px) rotate(0.5deg); }
    66%       { transform: translateY(5px) rotate(-0.5deg); }
  }
  .animate-float-subtle { animation: float-subtle 8s ease-in-out infinite; }

  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .animate-rotate-slow { animation: rotate-slow 10s linear infinite; }

  @keyframes rotate-fast {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .group:hover .animate-rotate-fast { animation: rotate-fast 4s linear infinite; }

  @keyframes pulse-subtle {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.02); opacity: 0.95; }
  }
  .animate-pulse-subtle { animation: pulse-subtle 3s ease-in-out infinite; }

  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 12px)); }
  }
  .animate-marquee { animation: marquee 30s linear infinite; }
  .animate-marquee:hover { animation-play-state: paused; }

  @keyframes marquee-reverse {
    0%   { transform: translateX(calc(-50% - 12px)); }
    100% { transform: translateX(0); }
  }
  .animate-marquee-reverse { animation: marquee-reverse 30s linear infinite; }
  .animate-marquee-reverse:hover { animation-play-state: paused; }

  @keyframes aura {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 0.8; transform: scale(1.1); }
  }
  .animate-aura { animation: aura 8s ease-in-out infinite; }

  .glass {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(0,0,0,0.05);
  }

  .perspective-1000 {
    perspective: 1000px;
  }

  .preserve-3d {
    transform-style: preserve-3d;
  }

  .rotate-y-12 {
    transform: rotateY(12deg);
  }

  .-rotate-x-6 {
    transform: rotateX(-6deg);
  }
  .pillar-card { background: #ffffff; }

  @keyframes shine-sweep {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }
  .animate-shine-sweep { animation: shine-sweep 4s ease-in-out infinite; }

  .reveal { opacity: 0; transform: translateY(48px); transition: opacity 0.75s cubic-bezier(.4,0,.2,1), transform 0.75s cubic-bezier(.4,0,.2,1); }
  .reveal.in-view { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-48px); transition: opacity 0.75s cubic-bezier(.4,0,.2,1), transform 0.75s cubic-bezier(.4,0,.2,1); }
  .reveal-left.in-view { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(48px); transition: opacity 0.75s cubic-bezier(.4,0,.2,1), transform 0.75s cubic-bezier(.4,0,.2,1); }
  .reveal-right.in-view { opacity: 1; transform: translateX(0); }
  .reveal-scale { opacity: 0; transform: scale(0.88); transition: opacity 0.75s cubic-bezier(.4,0,.2,1), transform 0.75s cubic-bezier(.4,0,.2,1); }
  .reveal-scale.in-view { opacity: 1; transform: scale(1); }
  .timeline-line { background: linear-gradient(to bottom, #f97316, #8b5cf6, #06b6d4, #10b981, #f59e0b); }

  @keyframes timeline-row-in {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .timeline-row {
    animation: timeline-row-in 0.65s cubic-bezier(.4,0,.2,1) both;
  }
`;

// ─── Scroll Reveal Hook ──────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ─── Sub-page placeholder (reusable back wrapper) ────────────────────────────

function DetailPage({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 px-6 py-24 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-widest"
      >
        ← Back
      </button>
      <h1 className="text-5xl font-black mb-6">{title}</h1>
      <p className="text-zinc-600 text-lg leading-relaxed">
        Detailed content for this section is coming soon. This page will contain comprehensive
        information about {title.toLowerCase()} and Kuzholuzo Azo Nienu's record in this area.
      </p>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header({
  isScrolled,
  onNavigate,
}: {
  isScrolled: boolean;
  onNavigate: (v: ViewState) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  const navLinks: { name: string; view: ViewState }[] = [
    { name: 'About', view: 'youth' },
    { name: 'Vision', view: 'governance' },
    { name: 'Achievements', view: 'development' },
    { name: 'Legacy', view: 'pillar-integrity' },
    { name: 'Contact', view: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        menuOpen
          ? 'h-screen bg-white'
          : isScrolled
          ? 'py-4 glass border-b border-black/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-[110]">
        {/* Logo */}
        <div
          onClick={() => { onNavigate('main'); setMenuOpen(false); }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600 group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/20">
            <Award className="text-white" size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase text-zinc-900">
            AZO{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              NIENU
            </span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 4).map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.view)}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="flex items-center gap-4 border-l border-black/10 pl-8">
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white text-sm font-bold rounded-full hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95"
            >
              Contact <Send size={14} />
            </button>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-900 relative z-[110]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-10 invisible h-0 overflow-hidden'
        }`}
      >
        <div className="h-[calc(100vh-80px)] flex flex-col px-6 pt-16 pb-10 overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <button
                key={link.name}
                className={`text-3xl font-black text-left border-b text-zinc-900 border-black/5 pb-6 transition-all duration-500 ${
                  menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${menuOpen ? idx * 50 : 0}ms` }}
                onClick={() => { onNavigate(link.view); setMenuOpen(false); }}
              >
                {link.name}
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-6 pt-10">
            <button
              onClick={() => { setMenuOpen(false); onNavigate('contact'); }}
              className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-orange-600 text-white text-xl font-bold rounded-2xl shadow-xl shadow-orange-600/20 active:scale-95"
            >
              Get in Touch <Send size={20} />
            </button>
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              Kuzholuzo Azo Nienu | Nagaland
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Journey Timeline ─────────────────────────────────────────────────────────

function JourneyTimeline() {
  useReveal();

  const events = [
    { year: '2000', title: 'Village Council Secretary',    detail: 'Began public life managing community records, resolving local disputes, and facilitating resource allocation across 3 villages.',                                                  dot: '#f97316', tag: 'Community',  borderRgb: '249,115,22',  shadowRgb: '249,115,22'  },
    { year: '2005', title: 'Community Welfare Leader',     detail: `Organized Nagaland's first inter-tribal youth welfare forum, reaching 4,000+ young people across 8 districts.`,                                                                     dot: '#7c3aed', tag: 'Welfare',    borderRgb: '124,58,237',  shadowRgb: '124,58,237'  },
    { year: '2010', title: 'State Legislature',             detail: 'Elected to the Nagaland Legislative Assembly. Championed the first Rural Connectivity Bill, connecting 22 villages.',                                                                dot: '#0891b2', tag: 'Governance', borderRgb: '8,145,178',   shadowRgb: '8,145,178'   },
    { year: '2015', title: '150+ Projects Milestone',      detail: 'Surpassed 150 completed infrastructure, health, and education projects. Received CII Northeast Entrepreneur Award.',                                                                  dot: '#059669', tag: 'Impact',     borderRgb: '5,150,105',   shadowRgb: '5,150,105'   },
    { year: '2020', title: 'Peace & Reconciliation',       detail: 'Facilitated 40+ inter-tribal dialogue sessions. Established the Annual Naga Reconciliation Gathering.',                                                                               dot: '#d97706', tag: 'Peace',      borderRgb: '217,119,6',   shadowRgb: '217,119,6'   },
    { year: '2024', title: 'Vision Nagaland 2035',         detail: 'Launched the Nagaland 2035 framework — targeting universal broadband, 95% school completion, and GDP doubling.',                                                                      dot: '#e11d48', tag: 'Vision',     borderRgb: '225,29,72',   shadowRgb: '225,29,72'   },
  ];

  // Shared diamond SVG pattern (inlined per-card tinted by color)
  const DiamondPattern = ({ color }: { color: string }) => (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
      <defs>
        <pattern id={`dp-${color.replace('#','')}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <polygon points="14,2 26,14 14,26 2,14" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dp-${color.replace('#','')})`} />
    </svg>
  );

  // Shared sparkle shine lines (crystal facet effect)
  const ShineLines = ({ color }: { color: string }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
      <line x1="0" y1="0" x2="100%" y2="100%" stroke={color} strokeWidth="0.5"/>
      <line x1="100%" y1="0" x2="0" y2="100%" stroke={color} strokeWidth="0.5"/>
      <line x1="50%" y1="0" x2="50%" y2="100%" stroke={color} strokeWidth="0.4"/>
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke={color} strokeWidth="0.4"/>
      <line x1="0" y1="25%" x2="75%" y2="100%" stroke={color} strokeWidth="0.3"/>
      <line x1="25%" y1="0" x2="100%" y2="75%" stroke={color} strokeWidth="0.3"/>
    </svg>
  );

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24 reveal">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-orange-500/60" />
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">The Journey</span>
            <div className="h-[1px] w-8 bg-orange-500/60" />
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight">
            Two Decades of{' '}
            <span className="relative inline-block">
              <span className="text-orange-500 italic">Purpose</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none">
                <path d="M0 5 Q50 0 100 3 Q150 6 200 2" stroke="#f97316" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
              </svg>
            </span>
          </h3>
          <p className="text-zinc-500 mt-6 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            A chronicle of milestones that shaped a leader and transformed Nagaland for generations to come.
          </p>
        </div>

        {/* ── DESKTOP Zigzag ── */}
        <div className="hidden md:block relative">
          {/* Central gradient spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(to bottom, #f97316, #7c3aed, #0891b2, #059669, #d97706, #e11d48)' }} />

          <div className="space-y-12">
            {events.map((ev, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>

                  {/* Card wrapper */}
                  <div
                    className={`w-[calc(50%-48px)] ${isLeft ? 'pr-10' : 'pl-10'} reveal${isLeft ? '-left' : '-right'} group`}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    {/* Outer glow ring — no background, just border + shadow */}
                    <div
                      className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
                      style={{
                        border: `1.5px solid rgba(${ev.borderRgb},0.45)`,
                        boxShadow: `0 4px 24px -4px rgba(${ev.shadowRgb},0.18), 0 0 0 1px rgba(${ev.borderRgb},0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
                        background: 'transparent',
                      }}
                    >
                      {/* Diamond tile pattern — transparent fill */}
                      <DiamondPattern color={ev.dot} />

                      {/* Crystal facet shine lines */}
                      <ShineLines color={ev.dot} />

                      {/* Animated sweep shine on hover */}
                      <div
                        className="absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12 pointer-events-none"
                        style={{ background: `linear-gradient(90deg, transparent, rgba(${ev.borderRgb},0.15), rgba(255,255,255,0.4), rgba(${ev.borderRgb},0.15), transparent)` }}
                      />

                      {/* Colored top edge accent */}
                      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${ev.dot}, transparent)` }} />

                      {/* Content — sits above pattern */}
                      <div className="relative z-10 p-6">
                        <div className="flex items-start gap-4">
                          {/* Year gem — diamond shape */}
                          <div className="flex-shrink-0 flex flex-col items-center gap-1">
                            <div
                              className="w-14 h-14 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300"
                              style={{
                                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                                background: `linear-gradient(135deg, ${ev.dot}ee, ${ev.dot}88)`,
                                boxShadow: `0 4px 16px rgba(${ev.shadowRgb},0.4)`,
                              }}
                            >
                              <span className="text-white text-[10px] font-black leading-tight text-center">{ev.year}</span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0 pt-1">
                            {/* Tag */}
                            <span
                              className="inline-block text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-0.5 rounded-full mb-2"
                              style={{
                                color: ev.dot,
                                background: `rgba(${ev.borderRgb},0.1)`,
                                border: `1px solid rgba(${ev.borderRgb},0.3)`,
                              }}
                            >
                              {ev.tag}
                            </span>
                            <h4 className="text-base md:text-lg font-black text-zinc-900 mb-1.5 leading-tight tracking-tight">{ev.title}</h4>
                            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{ev.detail}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot — diamond shape */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="w-5 h-5 shadow-lg"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        background: ev.dot,
                        boxShadow: `0 0 10px rgba(${ev.shadowRgb},0.6)`,
                      }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="w-[calc(50%-48px)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE Left-pinned ── */}
        <div className="md:hidden relative pl-10">
          <div className="absolute left-4 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(to bottom, #f97316, #7c3aed, #0891b2, #059669, #d97706, #e11d48)' }} />
          <div className="space-y-4">
            {events.map((ev, idx) => (
              <div key={idx} className="relative reveal" style={{ transitionDelay: `${idx * 70}ms` }}>
                {/* Diamond dot */}
                <div
                  className="absolute -left-[24px] top-5 w-4 h-4"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    background: ev.dot,
                    boxShadow: `0 0 8px rgba(${ev.shadowRgb},0.5)`,
                  }}
                />

                {/* Transparent card with diamond texture */}
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    border: `1.5px solid rgba(${ev.borderRgb},0.4)`,
                    boxShadow: `0 2px 16px -4px rgba(${ev.shadowRgb},0.15), inset 0 1px 0 rgba(255,255,255,0.8)`,
                    background: 'transparent',
                  }}
                >
                  {/* Diamond pattern */}
                  <DiamondPattern color={ev.dot} />
                  <ShineLines color={ev.dot} />
                  {/* Top edge */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${ev.dot}, transparent)` }} />

                  <div className="relative z-10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {/* Mini diamond year */}
                      <div
                        className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                          background: `linear-gradient(135deg, ${ev.dot}ee, ${ev.dot}88)`,
                        }}
                      >
                        <span className="text-white text-[7px] font-black">{ev.year.slice(2)}</span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: ev.dot }}>
                        {ev.year} · {ev.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-zinc-900 mb-1 leading-tight">{ev.title}</h4>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">{ev.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Stat Section ─────────────────────────────────────────────────────────────

function StatSection({ onStatClick }: { onStatClick?: (label: string) => void }) {
  useReveal();
  const awards = [
    {
      title: 'CULTURAL LEADERSHIP',
      org: 'Ministry of Culture',
      year: '2023',
      color: 'bg-[#0a192f]',
      glow: 'shadow-blue-500/20',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-400/30',
      shape: 'rounded-[2rem]'
    },
    {
      title: 'ENTREPRENEUR OF YEAR',
      org: 'CII Northeast',
      year: '2022',
      color: 'bg-[#1a0b2e]',
      glow: 'shadow-purple-500/20',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-400/30',
      shape: 'rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl'
    },
    {
      title: 'BEST FESTIVAL DIRECTOR',
      org: 'Indian Festival Assoc.',
      year: '2024',
      color: 'bg-[#2e1a05]',
      glow: 'shadow-orange-500/20',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-400/30',
      shape: 'rounded-[2rem_1rem_2rem_1rem]'
    },
    {
      title: 'CREATIVE ECONOMY',
      org: 'NITI Aayog',
      year: '2023',
      color: 'bg-[#052e2e]',
      glow: 'shadow-teal-500/20',
      iconColor: 'text-teal-400',
      borderColor: 'border-teal-400/30',
      shape: 'rounded-full'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-[#f3f4f6]/30 perspective-1000">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {awards.map((award, idx) => (
            <div
              key={idx}
              onClick={() => onStatClick?.(award.title)}
              className={`reveal-scale group relative ${award.color} ${award.glow} ${award.shape} p-5 md:p-7 flex flex-col items-center text-center cursor-pointer transition-all duration-700 preserve-3d hover:rotate-y-12 hover:-rotate-x-6 hover:scale-105 shadow-xl min-h-[160px] md:min-h-[200px] overflow-hidden`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='white' fill-opacity='0.3'/%3E%3C/svg%3E")`, backgroundSize: '20px 20px' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12" />
              <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full border-2 ${award.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 bg-white/5 backdrop-blur-sm`}>
                <Award className={award.iconColor} size={16} />
              </div>
              <h4 className="text-white font-black text-[9px] md:text-[10px] tracking-[0.15em] mb-1 leading-tight px-1 uppercase">{award.title}</h4>
              <p className="text-white/40 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] mb-4">{award.org}</p>
              <div className={`text-[9px] md:text-[10px] font-black ${award.iconColor} mt-auto tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity`}>{award.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features (Vision / Philosophy) ──────────────────────────────────────────

function Features({ onFeatureClick }: { onFeatureClick?: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useReveal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      id: 'youth',
      icon: <Users className="text-white" size={20} />,
      title: 'Youth Empowerment',
      description: 'Creating opportunities for the next generation of Naga leaders through education and skill development programs.',
      cardBg: 'bg-[#0c2340]',
      accent: 'bg-white/20',
      shape: 'rounded-[40px_10px_40px_10px]',
      borderColor: 'border-blue-400/30',
    },
    {
      id: 'development',
      icon: <Target className="text-white" size={20} />,
      title: 'Sustainable Development',
      description: 'Building infrastructure that respects our environment while driving economic growth across Nagaland.',
      cardBg: 'bg-[#8b0000]',
      accent: 'bg-white/20',
      shape: 'rounded-[10px_40px_10px_40px]',
      borderColor: 'border-red-400/30',
    },
    {
      id: 'governance',
      icon: <ShieldCheck className="text-white" size={20} />,
      title: 'Visionary Governance',
      description: 'Transparent, accountable, and people-centric leadership that puts the needs of every citizen first.',
      cardBg: 'bg-[#b8860b]',
      accent: 'bg-black/10',
      shape: 'rounded-[28px]',
      borderColor: 'border-yellow-400/30',
    },
    {
      id: 'welfare',
      icon: <Award className="text-white" size={20} />,
      title: 'Social Welfare',
      description: 'Championing the rights of the marginalized and ensuring equitable access to healthcare, education, and livelihood.',
      cardBg: 'bg-[#4a0e0e]',
      accent: 'bg-white/20',
      shape: 'rounded-[50px_50px_14px_14px]',
      borderColor: 'border-rose-400/30',
    },
    {
      id: 'infrastructure',
      icon: <Zap className="text-white" size={20} />,
      title: 'Infrastructure & Connectivity',
      description: 'Driving road, power, and digital connectivity projects that link every corner of Nagaland to opportunity.',
      cardBg: 'bg-[#013220]',
      accent: 'bg-white/20',
      shape: 'rounded-[14px_14px_50px_50px]',
      borderColor: 'border-emerald-400/30',
    },
    {
      id: 'peace',
      icon: <Globe className="text-white" size={20} />,
      title: 'Peace & Reconciliation',
      description: 'A steadfast commitment to lasting peace and unity among all Naga communities for a prosperous shared future.',
      cardBg: 'bg-[#2c3e50]',
      accent: 'bg-white/20',
      shape: 'rounded-[32px]',
      borderColor: 'border-slate-400/30',
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-8 md:mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-[10px] md:text-[11px] font-black text-orange-500 uppercase tracking-[0.5em] mb-3">Core Vision</h2>
          <h3 className="text-2xl md:text-5xl font-black text-zinc-900 max-w-3xl mx-auto leading-[1.1] tracking-tight">
            Leadership that touches the{' '}
            <span className="text-orange-500">heart</span> and{' '}
            <span className="text-orange-500">future</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => onFeatureClick?.(feature.id)}
              className={`relative p-[1px] ${feature.shape} overflow-hidden group cursor-pointer shadow-xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-90'
              } animate-float-subtle`}
              style={{ transitionDelay: `${idx * 100}ms`, animationDelay: `${idx * 0.4}s`, animationDuration: '8s' }}
            >
              <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.4)_30%,transparent_60%,rgba(255,255,255,0.2)_80%,transparent_100%)] animate-rotate-slow opacity-40 group-hover:opacity-100 transition-all duration-700" />
              <div className={`relative h-full p-4 md:p-7 ${feature.shape} ${feature.cardBg} transition-all duration-500 overflow-hidden border ${feature.borderColor} group-hover:border-white/50`}>
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '30px 30px' }} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/40 opacity-80 pointer-events-none" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12" />
                <div className="absolute -right-10 -bottom-10 w-20 md:w-40 h-20 md:h-40 bg-white/10 blur-[40px] group-hover:scale-125 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col items-start h-full">
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-[10px] md:rounded-[16px] ${feature.accent} backdrop-blur-xl flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 transition-transform shadow-xl border border-white/30 overflow-hidden`}>
                    <div className="scale-[0.8] md:scale-90">{feature.icon}</div>
                  </div>
                  <h4 className="text-[11px] md:text-base font-black text-white mb-1 md:mb-2 tracking-tighter leading-tight drop-shadow-lg">{feature.title}</h4>
                  <p className={`leading-relaxed text-[9px] md:text-xs font-medium line-clamp-3 ${feature.id === 'governance' ? 'text-black/80' : 'text-white/90'}`}>{feature.description}</p>
                  <div className="mt-auto pt-3 md:pt-5 items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex">
                    <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest ${feature.id === 'governance' ? 'text-black' : 'text-white'}`}>Explore</span>
                    <div className={`w-4 md:w-5 h-[2px] rounded-full ${feature.id === 'governance' ? 'bg-black' : 'bg-white'}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery() {
  useReveal();

  const photoUrls = [
    'https://i.ibb.co/S4mg64RW/Whats-App-Image-2026-04-05-at-6-48-25-PM.jpg',
    'https://i.ibb.co/fV4Tjg7Y/Whats-App-Image-2026-04-05-at-6-48-22-PM.jpg',
    'https://i.ibb.co/9mnQqnQX/Whats-App-Image-2026-04-05-at-6-48-20-PM.jpg',
    'https://i.ibb.co/RpcMmJjt/Whats-App-Image-2026-04-05-at-6-48-19-PM.jpg',
    'https://i.ibb.co/gb9W5zp5/Whats-App-Image-2026-04-05-at-6-48-19-PM-1.jpg',
    'https://i.ibb.co/LXt2Xt0B/Whats-App-Image-2026-04-05-at-6-48-18-PM.jpg',
    'https://i.ibb.co/Q7KsVd2j/Whats-App-Image-2026-04-05-at-6-48-17-PM.jpg',
    'https://i.ibb.co/V0NswSGb/Whats-App-Image-2026-04-05-at-6-48-13-PM.jpg',
    'https://i.ibb.co/KpHpvVp2/Whats-App-Image-2026-04-05-at-6-48-14-PM.jpg',
    'https://i.ibb.co/Z1zSz2pv/Azo.webp',
  ];

  const galleryItems: GalleryItem[] = photoUrls.map((url, i) => ({
    photo: { url, text: `Service Moment ${i + 1}` },
  }));

  // Duplicate for seamless loop
  const doubled = [...photoUrls, ...photoUrls];

  return (
    <section className="overflow-hidden bg-white relative py-10 md:py-24">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-500/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 reveal mb-8 md:mb-20">
        <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] mb-4">Visual Legacy</h2>
        <h3 className="text-3xl md:text-6xl font-black text-zinc-900 mb-3">
          Capturing moments of <span className="italic text-orange-500">service.</span>
        </h3>
        <p className="hidden md:block text-zinc-600 max-w-2xl mx-auto text-lg">
          Scroll to explore the journey of leadership through a 3D immersive gallery.
        </p>
      </div>

      {/* ── MOBILE: auto-scrolling marquee strip ── */}
      <div className="md:hidden w-full overflow-hidden">
        {/* Left/right fade masks */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />
          <div className="flex animate-marquee gap-3" style={{ width: 'max-content' }}>
            {doubled.map((url, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[140px] h-[105px] rounded-xl overflow-hidden shadow-md border border-black/5"
              >
                <img
                  src={url}
                  alt={`Moment ${(i % photoUrls.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Second row scrolling reverse */}
        <div className="relative mt-3">
          <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />
          <div className="flex animate-marquee-reverse gap-3" style={{ width: 'max-content' }}>
            {doubled.map((url, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[140px] h-[105px] rounded-xl overflow-hidden shadow-md border border-black/5"
              >
                <img
                  src={url}
                  alt={`Moment ${(i % photoUrls.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: 3D Circular Gallery ── */}
      <div className="hidden md:block w-full relative" style={{ height: '680px' }}>
        <CircularGallery items={galleryItems} radius={560} />
      </div>
    </section>
  );
}

// ─── Legacy Pillars ───────────────────────────────────────────────────────────

function LegacyPillars({ onPillarClick }: { onPillarClick?: (id: string) => void }) {
  useReveal();
  const pillars = [
    {
      id: 'pillar-integrity',
      icon: <ShieldCheck size={20} className="text-white md:w-6 md:h-6" />,
      title: 'Integrity in Service',
      description: 'Building a political career rooted in honesty and servant leadership — earning the trust of constituents across two decades.',
      metric: '20+ Years',
      accent: 'bg-orange-500',
      gradient: 'from-orange-50 to-white',
      borderColor: 'border-orange-200/50',
      iconBg: 'bg-orange-500',
      shadowColor: 'shadow-black/30',
      glowColor: 'bg-orange-500/10',
    },
    {
      id: 'pillar-unity',
      icon: <Globe2 size={20} className="text-white md:w-6 md:h-6" />,
      title: 'Naga Unity',
      description: 'Bridging tribal divides and championing reconciliation so that every Naga community walks together toward a shared future.',
      metric: 'United Nagaland',
      accent: 'bg-amber-500',
      gradient: 'from-amber-50 to-white',
      borderColor: 'border-amber-200/50',
      iconBg: 'bg-amber-500',
      shadowColor: 'shadow-black/30',
      glowColor: 'bg-amber-500/10',
    },
    {
      id: 'pillar-progress',
      icon: <Zap size={20} className="text-white md:w-6 md:h-6" />,
      title: 'Rapid Progress',
      description: 'Delivering tangible results — from road connectivity to digital infrastructure — that transform daily life for citizens.',
      metric: '150+ Projects',
      accent: 'bg-rose-500',
      gradient: 'from-rose-50 to-white',
      borderColor: 'border-rose-200/50',
      iconBg: 'bg-rose-500',
      shadowColor: 'shadow-black/30',
      glowColor: 'bg-rose-500/10',
    },
    {
      id: 'pillar-legacy',
      icon: <Rocket size={20} className="text-white md:w-6 md:h-6" />,
      title: 'Generational Legacy',
      description: 'Mentoring the next wave of Naga leaders and entrepreneurs who will carry forward the mission of a prosperous Nagaland.',
      metric: 'Future Ready',
      accent: 'bg-pink-500',
      gradient: 'from-pink-50 to-white',
      borderColor: 'border-pink-200/50',
      iconBg: 'bg-pink-500',
      shadowColor: 'shadow-black/30',
      glowColor: 'bg-pink-500/10',
    },
  ];

  return (
    <section className="py-14 md:py-20 px-4 md:px-6 relative overflow-hidden bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] rounded-full -z-10" />
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10 md:mb-14 reveal">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em] mb-3 text-center md:text-left">Strategic Impact</h2>
            <h3 className="text-2xl md:text-5xl font-black text-zinc-900 leading-tight text-center md:text-left">
              The Pillars of <br />
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent italic">Transformational</span>{' '}Change
            </h3>
          </div>
          <p className="text-zinc-600 text-sm max-w-xs pb-2 font-medium text-center md:text-left">Beyond campaigns, these core values define a lifetime of service to the Naga people.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => onPillarClick?.(pillar.id)}
              className={`reveal-scale group relative p-[1px] rounded-[20px] md:rounded-[28px] overflow-hidden hover:-translate-y-1 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl ${pillar.shadowColor} animate-float-subtle`}
              style={{ animationDelay: `${idx * 0.6}s`, transitionDelay: `${idx * 80}ms` }}
            >
              <div className={`absolute inset-0 ${pillar.glowColor} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />
              <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(0,0,0,0.05)_20%,transparent_40%,rgba(0,0,0,0.02)_70%,transparent_100%)] animate-rotate-slow opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className={`relative h-full p-4 md:p-8 rounded-[19px] md:rounded-[27px] bg-gradient-to-br ${pillar.gradient} border ${pillar.borderColor} group-hover:border-white/50 transition-all flex flex-col overflow-hidden pillar-card`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/5 opacity-40 pointer-events-none" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-[10px] md:rounded-[16px] ${pillar.iconBg} flex items-center justify-center mb-3 md:mb-6 border border-white/20 shadow-md group-hover:scale-110 transition-transform duration-500`}>
                    <div className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] scale-75 md:scale-100">{pillar.icon}</div>
                  </div>
                  <div className="mb-1 md:mb-3">
                    <span className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500 group-hover:text-zinc-800 transition-colors">{pillar.metric}</span>
                    <h4 className="text-xs md:text-xl font-black text-zinc-900 mt-0.5 tracking-tight leading-tight">{pillar.title}</h4>
                  </div>
                  <p className="text-zinc-700 text-[9px] md:text-sm leading-relaxed mb-3 md:mb-8 flex-grow font-medium line-clamp-3 md:line-clamp-none">{pillar.description}</p>
                  <div className="pt-2 md:pt-4 border-t border-black/5 flex items-center justify-between mt-auto">
                    <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 transition-colors">Record</span>
                    <div className={`w-4 md:w-8 h-[1.5px] ${pillar.accent} rounded-full transition-all duration-500 group-hover:w-10 md:group-hover:w-14`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Step Section (Journey) ───────────────────────────────────────────────────

function StepSection({ onStepClick }: { onStepClick?: (id: string) => void }) {
  useReveal();
  const steps = [
    {
      id: 'journey-roots',
      number: '01',
      title: 'Roots of Leadership',
      desc: 'From grassroots community organizer to state-level representative — a journey built on listening to the people.',
      hoverColor: 'group-hover/step:text-emerald-600',
      textColor: 'text-emerald-600',
      accent: 'bg-emerald-500',
      iconBg: 'bg-emerald-900',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    {
      id: 'journey-service',
      number: '02',
      title: 'Decades of Service',
      desc: 'Over 20 years championing welfare, infrastructure, and education for every district of Nagaland.',
      hoverColor: 'group-hover/step:text-blue-600',
      textColor: 'text-blue-600',
      accent: 'bg-blue-500',
      iconBg: 'bg-blue-900',
      glow: 'rgba(59, 130, 246, 0.4)',
    },
    {
      id: 'journey-vision',
      number: '03',
      title: 'Vision for Tomorrow',
      desc: 'Building coalitions, attracting investment, and positioning Nagaland as a model state in Northeast India.',
      hoverColor: 'group-hover/step:text-purple-600',
      textColor: 'text-purple-600',
      accent: 'bg-purple-500',
      iconBg: 'bg-purple-900',
      glow: 'rgba(168, 85, 247, 0.4)',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-50 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full -z-10 animate-aura" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-600/5 blur-[120px] rounded-full -z-10 animate-aura" style={{ animationDelay: '-5s' }} />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-14 md:mb-24">
          <div className="reveal-left text-center lg:text-left">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-3">The Journey</h2>
            <h3 className="text-3xl md:text-5xl font-black text-zinc-900 mb-5">
              A legacy of servant leadership.
            </h3>
            <p className="text-zinc-600 text-base max-w-lg mx-auto lg:mx-0">
              Kuzholuzo Azo Nienu believes that true service needs no title. His journey is defined by consistent impact and an unwavering commitment to the Naga people.
            </p>
          </div>
          <div className="reveal-right relative animate-float-subtle max-w-sm mx-auto w-full">
            <div className="absolute inset-0 bg-orange-500/20 blur-[80px] rounded-full z-0" />
            <div className="relative p-[1px] rounded-[36px] overflow-hidden group">
              <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(249,115,22,0.3)_30%,transparent_60%,rgba(255,255,255,0.1)_80%,transparent_100%)] animate-rotate-slow opacity-100 transition-all duration-700" />
              <div className="glass bg-white rounded-[35px] p-2 relative z-10 overflow-hidden shadow-2xl">
                <img
                  src="https://i.ibb.co/4gjtJW34/Whats-App-Image-2026-04-05-at-3-49-20-PM.jpg"
                  alt="Kuzholuzo Azo Nienu — The Journey"
                  className="rounded-[28px] w-full brightness-90 group-hover:brightness-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 z-0" />
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="reveal relative z-10 cursor-pointer group/step"
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => onStepClick?.(step.id)}
            >
              <div className="relative p-[1px] w-fit rounded-2xl overflow-hidden mb-5 animate-pulse-subtle group-hover/step:scale-110 transition-transform duration-500">
                <div
                  className="absolute inset-[-200%] animate-rotate-slow pointer-events-none"
                  style={{ background: `conic-gradient(from_0deg,transparent_0%,${step.glow}_25%,transparent_50%,rgba(255,255,255,0.3)_75%,transparent_100%)` }}
                />
                <div className={`relative w-14 h-14 ${step.iconBg} text-white flex items-center justify-center rounded-[14px] text-xl font-black shadow-xl`}>
                  {step.number}
                </div>
              </div>
              <h4 className={`text-xl font-bold text-zinc-900 mb-3 ${step.hoverColor} transition-colors`}>{step.title}</h4>
              <p className="text-zinc-600 leading-relaxed text-sm group-hover/step:text-zinc-800 transition-colors">{step.desc}</p>
              <div className="mt-5 w-full h-[1px] bg-black/5 relative overflow-hidden">
                <div className={`absolute inset-0 ${step.accent}/40 translate-x-[-100%] group-hover/step:translate-x-0 transition-transform duration-1000`} />
              </div>
              <div className="mt-3 flex items-center gap-2 opacity-40 group-hover/step:opacity-100 transition-all">
                <span className={`text-[10px] font-black uppercase tracking-widest ${step.textColor}`}>Read More</span>
                <div className={`h-[1px] w-6 ${step.accent} transition-all duration-500 group-hover/step:w-12`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection({ onContact }: { onContact: () => void }) {
  useReveal();
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full -z-10 animate-aura" />
      <div className="max-w-4xl mx-auto relative p-[1px] rounded-[24px] md:rounded-[32px] overflow-hidden group animate-float-subtle reveal">
        <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(249,115,22,0.2)_30%,transparent_60%,rgba(245,158,11,0.15)_80%,transparent_100%)] animate-rotate-slow" />
        <div className="relative bg-[#d7c4a3] rounded-[23px] md:rounded-[31px] p-8 md:p-16 text-center overflow-hidden shadow-[inset_0_0_80px_rgba(255,255,255,0.4)] border border-black/5">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine-sweep" />
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 blur-[60px] rounded-full" />
          <div className="relative z-10">
            <h2 className="text-xl md:text-4xl font-extrabold mb-4 md:mb-6 tracking-tight text-zinc-900">
              "The truest reward is the legacy left behind."
            </h2>
            <p className="text-zinc-600 text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-10">
              Join us in our mission to build a Nagaland where every citizen's voice is heard, every village is connected, and every young Naga can dream without limits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={onContact} className="px-7 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-colors w-full sm:w-auto text-sm shadow-lg shadow-orange-500/20">
                Join the Movement
              </button>
              <button onClick={onContact} className="px-7 py-3 border border-zinc-400 font-bold rounded-full hover:bg-zinc-100 transition-colors w-full sm:w-auto text-zinc-900 text-sm">
                Volunteer Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Get in Touch</h2>
          <p className="text-zinc-600 text-lg">
            Your voice matters. Reach out to share your thoughts, concerns, or to learn how you can support our mission for a better Nagaland.
          </p>
          <div className="space-y-6">
            {[
              { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'contact@azonienu.com' },
              { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 123 456 7890' },
              { icon: <MapPin className="w-5 h-5" />, label: 'Office', value: 'Kohima, Nagaland, India' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  {icon}
                </div>
                <div>
                  <div className="text-sm text-zinc-500">{label}</div>
                  <div className="text-zinc-900">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl glass border border-black/10 shadow-xl space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {['First Name', 'Last Name'].map((ph) => (
              <div key={ph} className="space-y-2">
                <label className="text-sm font-medium text-zinc-600">{ph}</label>
                <input
                  type="text"
                  className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-zinc-900 focus:border-orange-500/50 outline-none transition-all"
                  placeholder={ph.split(' ')[0]}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-600">Email Address</label>
            <input
              type="email"
              className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-zinc-900 focus:border-orange-500/50 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-600">Message</label>
            <textarea
              className="w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-zinc-900 focus:border-orange-500/50 outline-none transition-all h-32 resize-none"
              placeholder="How can we help you?"
            />
          </div>
          <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
            Send Message <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onNavigate }: { onNavigate: (v: ViewState) => void }) {
  const footerLinks = [
    {
      title: 'Leadership',
      links: [
        { name: 'Vision', view: 'governance' as ViewState },
        { name: 'Youth Empowerment', view: 'youth' as ViewState },
        { name: 'Achievements', view: 'development' as ViewState },
        { name: 'Legacy', view: 'pillar-integrity' as ViewState },
      ],
    },
    {
      title: 'Initiatives',
      links: [
        { name: 'Peace & Reconciliation', view: 'peace' as ViewState },
        { name: 'Infrastructure', view: 'infrastructure' as ViewState },
        { name: 'Social Welfare', view: 'welfare' as ViewState },
        { name: 'Mentorship', view: 'pillar-legacy' as ViewState },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'Contact Us', view: 'contact' as ViewState },
        { name: 'Volunteer', view: 'contact' as ViewState },
        { name: 'Join the Movement', view: 'contact' as ViewState },
      ],
    },
  ];

  return (
    <footer className="pt-24 pb-12 px-6 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div
              className="flex items-center gap-2 mb-6 cursor-pointer"
              onClick={() => onNavigate('main')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Award className="text-white" size={16} />
              </div>
              <span className="text-xl font-black tracking-tighter text-zinc-900 uppercase">
                AZO{' '}
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  NIENU
                </span>
              </span>
            </div>
            <p className="text-zinc-500 max-w-sm mb-8">
              A visionary leader dedicated to the people of Nagaland. Building a legacy of service, unity, and progress for generations to come.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Globe, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-900 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h5 className="text-zinc-900 font-bold mb-6">{section.title}</h5>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button
                      onClick={() => onNavigate(link.view)}
                      className="text-zinc-500 hover:text-zinc-900 transition-colors text-sm text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Kuzholuzo Azo Nienu. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-zinc-500 hover:text-zinc-900 text-xs transition-colors">Privacy</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900 text-xs transition-colors">Terms</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900 text-xs transition-colors">Nagaland</a>
          </div>
        </div>

        {/* Developer credit */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-[1px] w-8 bg-zinc-200" />
          <p className="text-zinc-400 text-[11px] tracking-wide">
            Developed by{' '}
            <span className="font-bold text-zinc-600 hover:text-orange-500 transition-colors cursor-default">
              NITI Technologies
            </span>
          </p>
          <div className="h-[1px] w-8 bg-zinc-200" />
        </div>
      </div>
    </footer>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<ViewState>('main');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (view !== 'main') window.scrollTo(0, 0);
  }, [view]);

  // Detail pages
  const detailTitles: Partial<Record<ViewState, string>> = {
    youth: 'Youth Empowerment',
    development: 'Sustainable Development',
    governance: 'Visionary Governance',
    welfare: 'Social Welfare',
    infrastructure: 'Infrastructure & Connectivity',
    peace: 'Peace & Reconciliation',
    'pillar-integrity': 'Integrity in Service',
    'pillar-unity': 'Naga Unity',
    'pillar-progress': 'Rapid Progress',
    'pillar-legacy': 'Generational Legacy',
    'journey-roots': 'Roots of Leadership',
    'journey-service': 'Decades of Service',
    'journey-vision': 'Vision for Tomorrow',
    contact: 'Contact',
  };

  if (view !== 'main' && detailTitles[view]) {
    if (view === 'contact') {
      return (
        <div className="min-h-screen bg-white text-zinc-900">
          <style>{globalStyles}</style>
          <div className="fixed top-[-15%] left-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[140px] rounded-full z-[-1]" />
          <Header isScrolled={true} onNavigate={setView} />
          <div className="pt-24">
            <ContactSection />
          </div>
          <Footer onNavigate={setView} />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-white text-zinc-900">
        <style>{globalStyles}</style>
        <Header isScrolled={true} onNavigate={setView} />
        <DetailPage title={detailTitles[view]!} onBack={() => setView('main')} />
        <Footer onNavigate={setView} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white transition-all duration-500">
      <style>{globalStyles}</style>

      {/* Ambient background auras */}
      <div className="fixed top-[-15%] left-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[140px] rounded-full z-[-1]" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-amber-500/5 blur-[140px] rounded-full z-[-1]" />

      <Header isScrolled={scrolled} onNavigate={setView} />

      <main>
        {/* ── HERO (unchanged) ── */}
        <div className="pt-24 px-4 pb-4">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-500/10 border border-black/5">
            <Hero
              className="h-[70vh] md:h-[85vh]"
              trustBadge={{
                text: 'Dedicated to the People of Nagaland',
                icons: ['⭐', '✨'],
              }}
              headline={{
                line1: 'Kuzholuzo',
                line2: 'Azo Nienu',
              }}
              subtitle="A Visionary Leader. A Voice for the People. Committed to building a stronger, more prosperous Nagaland for generations to come."
              buttons={{
                primary: {
                  text: 'Explore Our Vision',
                  onClick: () => setView('governance'),
                },
                secondary: {
                  text: 'Get Involved',
                  onClick: () => setView('contact'),
                },
              }}
            />
          </div>
        </div>

        {/* ── INTERACTIVE SELECTOR SECTION ── */}
        <InteractiveSelector />

        {/* ── STAT SECTION ── */}
        <StatSection
          onStatClick={() => setView('pillar-integrity')}
        />

        {/* ── JOURNEY TIMELINE ── */}
        <JourneyTimeline />

        {/* ── FEATURES (Vision pillars) ── */}
        <Features onFeatureClick={(id) => setView(id as ViewState)} />

        {/* ── IMAGE GALLERY ── */}
        <ImageGallery />

        {/* ── LEGACY PILLARS ── */}
        <LegacyPillars onPillarClick={(id) => setView(id as ViewState)} />

        {/* ── STEP SECTION (Journey) ── */}
        <StepSection onStepClick={(id) => setView(id as ViewState)} />

        {/* ── CTA SECTION ── */}
        <CTASection onContact={() => setView('contact')} />
      </main>

      <Footer onNavigate={setView} />
    </div>
  );
}