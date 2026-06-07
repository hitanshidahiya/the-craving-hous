import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, ArrowRight, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { menu, reviews, cafeInfo } from '../data'
import toast from 'react-hot-toast'

import logo      from '../assets/logo.png'
import interior1 from '../assets/interior1.jpg'
import interior2 from '../assets/interior2.jpg'
import exterior  from '../assets/exterior.jpg'
import heroBg    from '../assets/hero.png'
import food1     from '../assets/food1.jpg'
import video1    from '../assets/video1.mp4'

/* ── tiny helpers ─────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const R = ({ children, delay = '', className = '' }) => {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>
}

const Tag = ({ children }) => (
  <p className="section-tag">{children}</p>
)

/* ── FoodCard ─────────────────────────────────────────────── */
const gradients = {
  burgers:    'from-[#3D1A0A] to-[#7B4A2D]',
  pasta:      'from-[#7B4A2D] to-[#C4956A]',
  frappes:    'from-[#2A4A35] to-[#6B8F5E]',
  pizza:      'from-[#5C1A1A] to-[#A03030]',
  shakes:     'from-[#2B1A4A] to-[#6B4A9E]',
  drinks:     'from-[#1A3A2A] to-[#4A8F6A]',
  desserts:   'from-[#3D1A0A] to-[#C08B3A]',
  sandwiches: 'from-[#4A3A1A] to-[#8B6A30]',
  combos:     'from-[#1A0A04] to-[#3D1A0A]',
}

function FoodCard({ item }) {
  const { addItem } = useCart()
  const handleAdd = () => {
    addItem(item)
    toast.success(`${item.name} added!`, { icon: item.emoji })
  }
  return (
    <div className="group bg-ch-ivory rounded-[16px] sm:rounded-[20px] overflow-hidden border border-ch-brown/6 card-hover cursor-pointer">
      <div className={`relative h-36 sm:h-44 bg-gradient-to-br ${gradients[item.cat] || 'from-ch-brown to-ch-caramel'} flex items-center justify-center overflow-hidden`}>
        <span className="text-[4rem] sm:text-[5rem] drop-shadow-lg group-hover:scale-110 transition-transform duration-500 leading-none">
          {item.emoji}
        </span>
        {item.best && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-ch-brown/90 backdrop-blur-sm text-ch-cream text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full tracking-wider">
            ⭐ Best Seller
          </span>
        )}
        {!item.best && item.hot && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-ch-gold/90 backdrop-blur-sm text-ch-brown text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full tracking-wider">
            🔥 Trending
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-display font-semibold text-ch-brown text-[13px] sm:text-[15px] leading-snug mb-1">{item.name}</h3>
        <p className="text-ch-tan text-[11px] sm:text-xs leading-relaxed mb-3 line-clamp-2">{item.desc}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-ch-brown text-lg sm:text-xl">₹{item.price}</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={10} className="text-ch-gold fill-ch-gold" />
              <span className="text-[11px] text-ch-gold font-semibold">{item.rating}</span>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-ch-brown text-ch-cream flex items-center justify-center text-lg
              hover:bg-ch-gold hover:text-ch-brown transition-all duration-200 hover:scale-110 hover:shadow-[0_4px_12px_rgba(192,139,58,0.4)]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── ReviewCard ───────────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <div className="bg-ch-ivory rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 border border-ch-brown/6 card-hover relative overflow-hidden">
      <span className="absolute -top-2 right-4 font-display text-[60px] sm:text-[80px] text-ch-cream leading-none select-none pointer-events-none">
        "
      </span>
      <div className="flex items-center gap-3 mb-3 relative">
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: review.bg }}
        >
          {review.initials}
        </div>
        <div>
          <p className="font-semibold text-ch-brown text-sm leading-none">{review.name}</p>
          <p className="text-ch-tan text-[11px] mt-0.5">{review.meta}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-ch-gold fill-ch-gold" />)}
      </div>
      <p className="text-ch-caramel text-xs leading-relaxed mb-3 relative">"{review.text}"</p>
      <div className="flex flex-wrap gap-1.5">
        {review.tags.map(t => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-ch-parchment text-ch-caramel font-medium border border-ch-brown/6">
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        <span className="text-[10px] text-ch-tan/60">Google Review</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ */
export default function Home() {
  const bestSellers = menu.filter(i => i.best).slice(0, 4)
  const trending    = menu.filter(i => i.hot && !i.best).slice(0, 4)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Hero background — img scales correctly at every breakpoint */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] sm:object-center"
        />

        {/* Mobile: heavier uniform dark overlay so text is always readable */}
        <div className="absolute inset-0 pointer-events-none sm:hidden"
          style={{ background: 'rgba(6,3,1,0.78)' }}
        />

        {/* Desktop: directional overlay — dark left, reveals café on right */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block"
          style={{
            background: [
              'linear-gradient(to right, rgba(6,3,1,0.88) 0%, rgba(6,3,1,0.72) 32%, rgba(6,3,1,0.25) 58%, rgba(6,3,1,0.08) 100%)',
              'linear-gradient(to bottom, rgba(6,3,1,0.35) 0%, transparent 25%, transparent 70%, rgba(6,3,1,0.55) 100%)',
            ].join(', ')
          }}
        />

        {/* hero content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20 animate-fade-up">
          <div className="max-w-xl">

            {/* decorative line + heart */}
            <div className="flex items-center gap-3 mb-5 sm:mb-7">
              <span className="block w-8 h-px bg-ch-gold/50" />
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-ch-gold/60">
                <path d="M12 21C12 21 3 13.5 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-9 13-9 13z"
                  stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* headline — smaller clamp floor for mobile */}
            <h1 className="font-display font-bold text-ch-cream leading-[1.06] mb-4 sm:mb-5"
              style={{ fontSize:'clamp(2rem,8vw,5rem)' }}>
              Where<br />
              Cravings<br />
              Become<br />
              <em className="not-italic"
                style={{ color:'#C8972A', textShadow:'0 0 60px rgba(200,151,42,0.45)' }}>
                Memories
              </em>
            </h1>

            <p className="text-ch-cream/55 text-[13px] sm:text-[15px] mb-8 sm:mb-10 tracking-wide">
              A perfect blend of taste, comfort &amp; vibes.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <Link
                to="/order?type=dine-in"
                className="inline-flex items-center gap-2 sm:gap-2.5 font-semibold text-[12px] sm:text-[13px] px-5 sm:px-7 py-3 sm:py-3.5 rounded-full
                  transition-all duration-200 hover:scale-105 hover:shadow-[0_6px_24px_rgba(200,151,42,0.45)]"
                style={{ background:'#C8972A', color:'#1A0A04' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 2h18l-2 13H5L3 2z"/><circle cx="9" cy="21" r="1"/><circle cx="15" cy="21" r="1"/>
                </svg>
                Dine In
              </Link>
              <Link
                to="/order?type=takeaway"
                className="inline-flex items-center gap-2 sm:gap-2.5 font-semibold text-[12px] sm:text-[13px] px-5 sm:px-7 py-3 sm:py-3.5 rounded-full
                  border border-ch-cream/30 text-ch-cream backdrop-blur-sm
                  hover:bg-ch-cream/10 hover:border-ch-cream/50 transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Take Away
              </Link>
            </div>

            {/* stats row — tighter gap on mobile */}
            <div className="flex items-center gap-5 sm:gap-8 border-t border-ch-cream/10 mt-10 sm:mt-14 pt-5 sm:pt-7 flex-wrap">
              {[
                { val:'5.0 ★', label:'Google Rating' },
                { val:'19+',   label:'Happy Reviews'  },
                { val:'₹1–200',label:'Affordable'      },
              ].map((s, i) => (
                <div key={i}>
                  <span className="font-display font-bold text-ch-cream text-lg sm:text-xl block leading-none mb-1">{s.val}</span>
                  <span className="text-ch-cream/35 text-[9px] sm:text-[10px] uppercase tracking-[0.14em]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-scroll-hint">
          <ChevronDown size={16} className="text-ch-cream/25" />
          <span className="text-ch-cream/20 text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ── BEST SELLERS ──────────────────────────────────── */}
      <section id="bestsellers" className="py-14 sm:py-24 bg-ch-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <R className="mb-8 sm:mb-12">
            <Tag>Our Favourites</Tag>
            <h2 className="font-display font-bold text-ch-brown leading-tight mb-3"
              style={{ fontSize:'clamp(1.5rem,4vw,2.8rem)' }}>
              Best Sellers Everyone<br />
              <em className="text-ch-gold not-italic">Keeps Coming Back For</em>
            </h2>
            <p className="text-ch-tan text-sm max-w-sm">Our most-loved dishes, crafted with care and served with love.</p>
          </R>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {bestSellers.map((item, i) => (
              <R key={item.id} delay={`reveal-d${i + 1}`}>
                <FoodCard item={item} />
              </R>
            ))}
          </div>

          <R className="mt-8 sm:mt-10 text-center">
            <Link to="/menu"
              className="inline-flex items-center gap-2 text-ch-brown text-sm font-semibold
                border-b border-ch-gold pb-0.5 hover:text-ch-gold transition-colors">
              View Full Menu <ArrowRight size={14} />
            </Link>
          </R>
        </div>
      </section>

      {/* ── TRENDING ──────────────────────────────────────── */}
      <section className="py-14 sm:py-24 bg-ch-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <R className="mb-8 sm:mb-12">
            <Tag>Right Now</Tag>
            <h2 className="font-display font-bold text-ch-brown leading-tight"
              style={{ fontSize:'clamp(1.5rem,4vw,2.8rem)' }}>
              <em className="text-ch-gold not-italic">Trending</em> This Week
            </h2>
          </R>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {trending.map((item, i) => (
              <R key={item.id} delay={`reveal-d${i + 1}`}>
                <FoodCard item={item} />
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 bg-ch-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <R className="mb-8 sm:mb-12">
            <p className="flex items-center gap-2.5 text-ch-gold text-xs font-semibold tracking-[0.16em] uppercase mb-3">
              <span className="block w-5 h-px bg-ch-gold" />Why Students Love Us
            </p>
            <h2 className="font-display font-bold text-ch-cream leading-tight mb-3"
              style={{ fontSize:'clamp(1.5rem,4vw,2.8rem)' }}>
              Your <em className="text-ch-amber not-italic">Everyday</em><br />Evening Place
            </h2>
            <p className="text-ch-cream/40 text-sm max-w-sm">A spot where every visit feels like home — cozy, aesthetic & delicious.</p>
          </R>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon:'🌿', title:'Pinterest-Worthy Vibes',  desc:'Ivy walls, brass lamps, rattan lights — every corner is your next Instagram story.' },
              { icon:'👨‍🍳', title:'Owner Who Cares',         desc:'A super humble owner and warm staff who make every guest feel truly welcome.' },
              { icon:'💸', title:'₹1 – ₹200 Only',          desc:'Premium cafe experience at student-friendly prices. Eat well without the guilt.' },
              { icon:'🔇', title:'Quiet & Easy to Talk',    desc:'Calm ambience perfect for dates, study sessions, or catching up with friends.' },
              { icon:'⚡', title:'No Wait Time',             desc:'Fast service without compromising on quality. Your order, fresh and fast.' },
              { icon:'⭐', title:'5.0 Google Rating',        desc:'Perfect score across Food, Service & Atmosphere — our guests say it all.' },
            ].map((c, i) => (
              <R key={c.title} delay={`reveal-d${(i % 3) + 1}`}
                className="bg-ch-cream/5 border border-ch-cream/8 rounded-[16px] sm:rounded-[20px] p-5 sm:p-7
                  hover:bg-ch-cream/10 hover:-translate-y-1 hover:border-ch-cream/15 transition-all duration-300">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-ch-gold/15 flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5">{c.icon}</div>
                <h3 className="font-display text-ch-cream font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">{c.title}</h3>
                <p className="text-ch-cream/45 text-xs leading-relaxed">{c.desc}</p>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────── */}
      <section id="gallery" className="py-14 sm:py-24 bg-ch-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <R className="mb-8 sm:mb-12">
            <Tag>Our Space</Tag>
            <h2 className="font-display font-bold text-ch-brown leading-tight"
              style={{ fontSize:'clamp(1.5rem,4vw,2.8rem)' }}>
              Step Into <em className="text-ch-gold not-italic">The Hous</em>
            </h2>
          </R>

          {/* Mobile: stacked, Desktop: masonry */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="rounded-[16px] overflow-hidden relative" style={{ height:'220px' }}>
              <img src={interior2} alt="Interior" className="w-full h-full object-cover" />
            </div>
            {[
              { src: interior1, label:'Logo Wall',      sub:'Our signature mirror sign' },
              { src: food1,     label:'Delicious Food', sub:'Made fresh every day'       },
            ].map((g) => (
              <div key={g.label} className="rounded-[16px] overflow-hidden relative" style={{ height:'160px' }}>
                <img src={g.src} alt={g.label} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Desktop masonry grid */}
          <R className="hidden sm:grid grid-cols-3 gap-4">
            <div className="col-span-2 row-span-2 rounded-[20px] overflow-hidden group cursor-pointer relative"
              style={{ minHeight:'280px' }}>
              <img src={interior2} alt="Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ch-brown/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="font-display text-ch-cream font-semibold text-lg">Cozy Interiors</p>
                  <p className="text-ch-cream/60 text-xs mt-0.5">Rattan lights · Walnut wood · Warm ambience</p>
                </div>
              </div>
            </div>
            {[
              { src: interior1, label:'Logo Wall',      sub:'Our signature mirror sign' },
              { src: food1,     label:'Delicious Food', sub:'Made fresh every day'       },
            ].map((g) => (
              <div key={g.label} className="rounded-[20px] overflow-hidden group cursor-pointer relative h-44 lg:h-auto">
                <img src={g.src} alt={g.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ch-brown/65 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="font-display text-ch-cream font-semibold text-sm">{g.label}</p>
                    <p className="text-ch-cream/55 text-[11px]">{g.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </R>
        </div>
      </section>

      {/* ── VIDEO ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 bg-ch-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <R className="mb-8 sm:mb-10">
            <p className="flex items-center gap-2.5 text-ch-gold text-xs font-semibold tracking-[0.16em] uppercase mb-3">
              <span className="block w-5 h-px bg-ch-gold" />The Vibe
            </p>
            <h2 className="font-display font-bold text-ch-cream leading-tight"
              style={{ fontSize:'clamp(1.5rem,4vw,2.8rem)' }}>
              Feel The <em className="text-ch-amber not-italic">Atmosphere</em>
            </h2>
          </R>
          <R>
            <div className="rounded-[16px] sm:rounded-[24px] overflow-hidden border border-ch-cream/8 relative"
              style={{ aspectRatio:'16/9', background:'#1A0A04' }}>
              <video src={video1} autoPlay muted loop playsInline
                className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background:'radial-gradient(ellipse at center,transparent 50%,rgba(26,10,4,0.4) 100%)' }} />
            </div>
          </R>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────── */}
      <section id="reviews" className="py-14 sm:py-24 bg-ch-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <R className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <Tag>What People Say</Tag>
              <h2 className="font-display font-bold text-ch-brown leading-tight"
                style={{ fontSize:'clamp(1.5rem,4vw,2.8rem)' }}>
                Real <em className="text-ch-gold not-italic">Guests</em>,<br />Real Love
              </h2>
            </div>
            <div className="inline-flex items-center gap-4 bg-ch-brown px-5 sm:px-6 py-3 sm:py-4 rounded-2xl self-start">
              <span className="font-display font-bold text-ch-amber text-3xl sm:text-4xl leading-none">5.0</span>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-ch-gold fill-ch-gold" />)}
                </div>
                <p className="text-ch-cream/50 text-xs">{cafeInfo.reviewCount} Google Reviews</p>
                <p className="text-ch-cream/30 text-[10px]">Food · Service · Atmosphere</p>
              </div>
            </div>
          </R>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {reviews.map((r, i) => (
              <R key={r.id} delay={`reveal-d${(i % 4) + 1}`}>
                <ReviewCard review={r} />
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ──────────────────────────────────────── */}
      <section id="locate" className="py-14 sm:py-24 bg-ch-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <R className="mb-8 sm:mb-12">
            <Tag>Find Us</Tag>
            <h2 className="font-display font-bold text-ch-brown leading-tight mb-2"
              style={{ fontSize:'clamp(1.5rem,4vw,2.8rem)' }}>
              Come Visit <em className="text-ch-gold not-italic">Us</em>
            </h2>
            <p className="text-ch-tan text-sm">In Kharar, Punjab — easy to find, hard to leave.</p>
          </R>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
            <R>
              <div className="rounded-[16px] sm:rounded-[20px] overflow-hidden border border-ch-brown/8 h-[260px] sm:h-[380px]">
                <iframe
                  src="https://maps.google.com/maps?q=The+Craving+Hous+Kharar+Punjab&output=embed&z=16"
                  width="100%" height="100%" style={{ border:0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Craving Hous map"
                />
              </div>
            </R>

            <R delay="reveal-d1" className="flex flex-col gap-3 sm:gap-4">
              <div className="bg-ch-parchment rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 border border-ch-brown/7">
                <h3 className="font-display text-ch-brown font-semibold text-base sm:text-lg mb-4 sm:mb-5">Contact & Info</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { icon:'📍', label:'Address',      val: cafeInfo.address         },
                    { icon:'📸', label:'Instagram',    val: cafeInfo.instagramHandle  },
                    { icon:'⭐', label:'Rating',       val: `5.0 / 5.0 · ${cafeInfo.reviewCount} Reviews` },
                    { icon:'💰', label:'Price Range',  val: cafeInfo.priceRange + ' per person' },
                  ].map(row => (
                    <div key={row.label} className="flex items-start gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-ch-ivory flex items-center justify-center text-sm sm:text-base flex-shrink-0 border border-ch-brown/6">
                        {row.icon}
                      </div>
                      <div>
                        <p className="text-ch-tan text-[10px] uppercase tracking-wider">{row.label}</p>
                        <p className="text-ch-brown font-medium text-xs sm:text-sm">{row.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-ch-parchment rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 border border-ch-brown/7">
                <h3 className="font-display text-ch-brown font-semibold text-base sm:text-lg mb-3 sm:mb-4">Opening Hours</h3>
                <div className="space-y-2 sm:space-y-2.5">
                  {Object.entries(cafeInfo.hours).map(([day, time]) => (
                    <div key={day} className="flex justify-between text-xs sm:text-sm">
                      <span className="text-ch-tan">{day}</span>
                      <span className="text-ch-brown font-medium">{time}</span>
                    </div>
                  ))}
                </div>
                <a href={cafeInfo.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-4 sm:mt-5 btn-primary text-xs px-4 sm:px-5 py-2 sm:py-2.5 inline-flex">
                  <MapPin size={13} /> Get Directions
                </a>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-ch-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'28px 28px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(192,139,58,0.1) 0%,transparent 70%)' }} />
        <R className="relative text-center max-w-2xl mx-auto px-5 sm:px-6">
          <p className="font-display italic text-ch-amber/70 text-sm mb-3 tracking-wide">Ready to order?</p>
          <h2 className="font-display font-bold text-ch-cream text-2xl sm:text-3xl md:text-4xl leading-tight mb-5 sm:mb-6">
            Your next craving<br />is one tap away
          </h2>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
            <Link to="/menu" className="btn-gold text-sm sm:text-base">
              Browse Menu <ArrowRight size={14} />
            </Link>
            <Link to="/order?type=dine-in" className="btn-outline text-sm sm:text-base">
              🍽️ Dine In
            </Link>
          </div>
        </R>
      </section>
    </>
  )
}
