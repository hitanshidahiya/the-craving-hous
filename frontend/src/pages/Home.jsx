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
    <div className="group bg-ch-ivory rounded-[20px] overflow-hidden border border-ch-brown/6 card-hover cursor-pointer">
      {/* image area */}
      <div className={`relative h-44 bg-gradient-to-br ${gradients[item.cat] || 'from-ch-brown to-ch-caramel'} flex items-center justify-center overflow-hidden`}>
        <span className="text-[5rem] drop-shadow-lg group-hover:scale-110 transition-transform duration-500 leading-none">
          {item.emoji}
        </span>
        {item.best && (
          <span className="absolute top-3 left-3 bg-ch-brown/90 backdrop-blur-sm text-ch-cream text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider">
            ⭐ Best Seller
          </span>
        )}
        {!item.best && item.hot && (
          <span className="absolute top-3 left-3 bg-ch-gold/90 backdrop-blur-sm text-ch-brown text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider">
            🔥 Trending
          </span>
        )}
        {/* subtle shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>

      {/* body */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-ch-brown text-[15px] leading-snug mb-1">{item.name}</h3>
        <p className="text-ch-tan text-xs leading-relaxed mb-3 line-clamp-2">{item.desc}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-ch-brown text-xl">₹{item.price}</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={10} className="text-ch-gold fill-ch-gold" />
              <span className="text-[11px] text-ch-gold font-semibold">{item.rating}</span>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="w-9 h-9 rounded-full bg-ch-brown text-ch-cream flex items-center justify-center text-lg
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
    <div className="bg-ch-ivory rounded-[20px] p-5 border border-ch-brown/6 card-hover relative overflow-hidden">
      {/* giant quote */}
      <span className="absolute -top-2 right-4 font-display text-[80px] text-ch-cream leading-none select-none pointer-events-none">
        "
      </span>
      {/* reviewer */}
      <div className="flex items-center gap-3 mb-3 relative">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: review.bg }}
        >
          {review.initials}
        </div>
        <div>
          <p className="font-semibold text-ch-brown text-sm leading-none">{review.name}</p>
          <p className="text-ch-tan text-[11px] mt-0.5">{review.meta}</p>
        </div>
      </div>
      {/* stars */}
      <div className="flex gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-ch-gold fill-ch-gold" />)}
      </div>
      <p className="text-ch-caramel text-xs leading-relaxed mb-3 relative">"{review.text}"</p>
      {/* tags */}
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
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ch-charcoal">

        {/* layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#100500] via-[#2B1206] to-[#1A0A04]" />

        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'36px 36px' }} />

        {/* radial glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(192,139,58,0.12) 0%,transparent 65%)' }} />

        {/* hero content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto pt-24 pb-32 animate-fade-up">

          {/* pill badge */}
          <div className="inline-flex items-center gap-2 bg-ch-cream/8 border border-ch-cream/12
            text-ch-cream/70 text-[11px] tracking-[0.16em] uppercase px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-ch-gold animate-pulse" />
            Now Open · Kharar, Punjab
          </div>

          {/* logo */}
          <div className="relative mb-8">
            <img
              src={logo}
              alt="The Craving Hous"
              className="w-28 h-28 rounded-full object-cover animate-pulse-glow"
              style={{ boxShadow:'0 0 0 1px rgba(192,139,58,0.2), 0 0 40px rgba(192,139,58,0.15)' }}
            />
            {/* orbiting ring */}
            <div className="absolute inset-[-8px] rounded-full border border-ch-gold/15 animate-spin"
              style={{ animationDuration:'12s' }} />
          </div>

          <h1 className="font-display font-bold text-ch-cream leading-[1.08] mb-5"
            style={{ fontSize:'clamp(2.6rem,7vw,5.2rem)' }}>
            Where Cravings<br />
            Become <em className="text-ch-amber not-italic"
              style={{ textShadow:'0 0 40px rgba(224,176,96,0.3)' }}>Memories</em>
          </h1>

          <p className="font-display italic text-ch-cream/45 text-lg mb-10 tracking-wide">
            Burgers · Pasta · Frappes · Pizza · Desserts & More
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-16">
            <Link to="/order?type=dine-in" className="btn-gold text-[13px] px-8 py-3.5">
              🍽️ Dine In
            </Link>
            <Link to="/order?type=takeaway" className="btn-outline text-[13px] px-8 py-3.5">
              🥡 Take Away
            </Link>
          </div>

          {/* stats row */}
          <div className="flex items-center gap-8 sm:gap-12 border-t border-ch-cream/8 pt-8 flex-wrap justify-center">
            {[
              { val:'5.0 ★', label:'Google Rating' },
              { val:'19+',   label:'Happy Reviews'  },
              { val:'₹1–200',label:'Affordable'      },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <span className="font-display font-bold text-ch-cream text-2xl block leading-none mb-1">{s.val}</span>
                <span className="text-ch-cream/35 text-[10px] uppercase tracking-[0.14em]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-scroll-hint">
          <ChevronDown size={16} className="text-ch-cream/25" />
          <span className="text-ch-cream/20 text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ── BEST SELLERS ──────────────────────────────────── */}
      <section id="bestsellers" className="py-24 bg-ch-parchment">
        <div className="max-w-7xl mx-auto px-6">
          <R className="mb-12">
            <Tag>Our Favourites</Tag>
            <h2 className="font-display font-bold text-ch-brown leading-tight mb-3"
              style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              Best Sellers Everyone<br />
              <em className="text-ch-gold not-italic">Keeps Coming Back For</em>
            </h2>
            <p className="text-ch-tan text-sm max-w-sm">Our most-loved dishes, crafted with care and served with love.</p>
          </R>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.map((item, i) => (
              <R key={item.id} delay={`reveal-d${i + 1}`}>
                <FoodCard item={item} />
              </R>
            ))}
          </div>

          <R className="mt-10 text-center">
            <Link to="/menu"
              className="inline-flex items-center gap-2 text-ch-brown text-sm font-semibold
                border-b border-ch-gold pb-0.5 hover:text-ch-gold transition-colors">
              View Full Menu <ArrowRight size={14} />
            </Link>
          </R>
        </div>
      </section>

      {/* ── TRENDING ──────────────────────────────────────── */}
      <section className="py-24 bg-ch-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <R className="mb-12">
            <Tag>Right Now</Tag>
            <h2 className="font-display font-bold text-ch-brown leading-tight"
              style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              <em className="text-ch-gold not-italic">Trending</em> This Week
            </h2>
          </R>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trending.map((item, i) => (
              <R key={item.id} delay={`reveal-d${i + 1}`}>
                <FoodCard item={item} />
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────── */}
      <section className="py-24 bg-ch-brown relative overflow-hidden">
        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <R className="mb-12">
            <p className="flex items-center gap-2.5 text-ch-gold text-xs font-semibold tracking-[0.16em] uppercase mb-3">
              <span className="block w-5 h-px bg-ch-gold" />Why Students Love Us
            </p>
            <h2 className="font-display font-bold text-ch-cream leading-tight mb-3"
              style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              Your <em className="text-ch-amber not-italic">Everyday</em><br />Evening Place
            </h2>
            <p className="text-ch-cream/40 text-sm max-w-sm">A spot where every visit feels like home — cozy, aesthetic & delicious.</p>
          </R>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon:'🌿', title:'Pinterest-Worthy Vibes',  desc:'Ivy walls, brass lamps, rattan lights — every corner is your next Instagram story.' },
              { icon:'👨‍🍳', title:'Owner Who Cares',         desc:'A super humble owner and warm staff who make every guest feel truly welcome.' },
              { icon:'💸', title:'₹1 – ₹200 Only',          desc:'Premium cafe experience at student-friendly prices. Eat well without the guilt.' },
              { icon:'🔇', title:'Quiet & Easy to Talk',    desc:'Calm ambience perfect for dates, study sessions, or catching up with friends.' },
              { icon:'⚡', title:'No Wait Time',             desc:'Fast service without compromising on quality. Your order, fresh and fast.' },
              { icon:'⭐', title:'5.0 Google Rating',        desc:'Perfect score across Food, Service & Atmosphere — our guests say it all.' },
            ].map((c, i) => (
              <R key={c.title} delay={`reveal-d${(i % 3) + 1}`}
                className="bg-ch-cream/5 border border-ch-cream/8 rounded-[20px] p-7
                  hover:bg-ch-cream/10 hover:-translate-y-1 hover:border-ch-cream/15 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-ch-gold/15 flex items-center justify-center text-xl mb-5">{c.icon}</div>
                <h3 className="font-display text-ch-cream font-semibold text-base mb-2">{c.title}</h3>
                <p className="text-ch-cream/45 text-xs leading-relaxed">{c.desc}</p>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────── */}
      <section id="gallery" className="py-24 bg-ch-parchment">
        <div className="max-w-7xl mx-auto px-6">
          <R className="mb-12">
            <Tag>Our Space</Tag>
            <h2 className="font-display font-bold text-ch-brown leading-tight"
              style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              Step Into <em className="text-ch-gold not-italic">The Hous</em>
            </h2>
          </R>

          {/* Masonry-style grid */}
          <R className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* big feature tile */}
            <div className="col-span-2 lg:row-span-2 rounded-[20px] overflow-hidden group cursor-pointer relative"
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
      <section className="py-24 bg-ch-brown">
        <div className="max-w-7xl mx-auto px-6">
          <R className="mb-10">
            <p className="flex items-center gap-2.5 text-ch-gold text-xs font-semibold tracking-[0.16em] uppercase mb-3">
              <span className="block w-5 h-px bg-ch-gold" />The Vibe
            </p>
            <h2 className="font-display font-bold text-ch-cream leading-tight"
              style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              Feel The <em className="text-ch-amber not-italic">Atmosphere</em>
            </h2>
          </R>
          <R>
            <div className="rounded-[24px] overflow-hidden border border-ch-cream/8 relative"
              style={{ aspectRatio:'16/7', background:'#1A0A04' }}>
              <video src={video1} autoPlay muted loop playsInline
                className="w-full h-full object-cover opacity-90" />
              {/* vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background:'radial-gradient(ellipse at center,transparent 50%,rgba(26,10,4,0.4) 100%)' }} />
            </div>
          </R>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────── */}
      <section id="reviews" className="py-24 bg-ch-parchment">
        <div className="max-w-7xl mx-auto px-6">
          <R className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <Tag>What People Say</Tag>
              <h2 className="font-display font-bold text-ch-brown leading-tight"
                style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
                Real <em className="text-ch-gold not-italic">Guests</em>,<br />Real Love
              </h2>
            </div>
            {/* overall score card */}
            <div className="inline-flex items-center gap-4 bg-ch-brown px-6 py-4 rounded-2xl self-start">
              <span className="font-display font-bold text-ch-amber text-4xl leading-none">5.0</span>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-ch-gold fill-ch-gold" />)}
                </div>
                <p className="text-ch-cream/50 text-xs">{cafeInfo.reviewCount} Google Reviews</p>
                <p className="text-ch-cream/30 text-[10px]">Food · Service · Atmosphere</p>
              </div>
            </div>
          </R>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((r, i) => (
              <R key={r.id} delay={`reveal-d${(i % 4) + 1}`}>
                <ReviewCard review={r} />
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ──────────────────────────────────────── */}
      <section id="locate" className="py-24 bg-ch-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <R className="mb-12">
            <Tag>Find Us</Tag>
            <h2 className="font-display font-bold text-ch-brown leading-tight mb-2"
              style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
              Come Visit <em className="text-ch-gold not-italic">Us</em>
            </h2>
            <p className="text-ch-tan text-sm">In Kharar, Punjab — easy to find, hard to leave.</p>
          </R>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* map */}
            <R>
              <div className="rounded-[20px] overflow-hidden border border-ch-brown/8 h-[380px]">
                <iframe
                  src="https://maps.google.com/maps?q=The+Craving+Hous+Kharar+Punjab&output=embed&z=16"
                  width="100%" height="100%" style={{ border:0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Craving Hous map"
                />
              </div>
            </R>

            {/* info cards */}
            <R delay="reveal-d1" className="flex flex-col gap-4">
              <div className="bg-ch-parchment rounded-[20px] p-6 border border-ch-brown/7">
                <h3 className="font-display text-ch-brown font-semibold text-lg mb-5">Contact & Info</h3>
                <div className="space-y-4">
                  {[
                    { icon:'📍', label:'Address',      val: cafeInfo.address         },
                    { icon:'📸', label:'Instagram',    val: cafeInfo.instagramHandle  },
                    { icon:'⭐', label:'Rating',       val: `5.0 / 5.0 · ${cafeInfo.reviewCount} Reviews` },
                    { icon:'💰', label:'Price Range',  val: cafeInfo.priceRange + ' per person' },
                  ].map(row => (
                    <div key={row.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-ch-ivory flex items-center justify-center text-base flex-shrink-0 border border-ch-brown/6">
                        {row.icon}
                      </div>
                      <div>
                        <p className="text-ch-tan text-[10px] uppercase tracking-wider">{row.label}</p>
                        <p className="text-ch-brown font-medium text-sm">{row.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-ch-parchment rounded-[20px] p-6 border border-ch-brown/7">
                <h3 className="font-display text-ch-brown font-semibold text-lg mb-4">Opening Hours</h3>
                <div className="space-y-2.5">
                  {Object.entries(cafeInfo.hours).map(([day, time]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-ch-tan">{day}</span>
                      <span className="text-ch-brown font-medium">{time}</span>
                    </div>
                  ))}
                </div>
                <a href={cafeInfo.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-5 btn-primary text-xs px-5 py-2.5 inline-flex">
                  <MapPin size={13} /> Get Directions
                </a>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-20 bg-ch-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:'radial-gradient(circle at 1px 1px,#EDD9B0 1px,transparent 0)', backgroundSize:'28px 28px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(192,139,58,0.1) 0%,transparent 70%)' }} />
        <R className="relative text-center max-w-2xl mx-auto px-6">
          <p className="font-display italic text-ch-amber/70 text-sm mb-3 tracking-wide">Ready to order?</p>
          <h2 className="font-display font-bold text-ch-cream text-3xl sm:text-4xl leading-tight mb-6">
            Your next craving<br />is one tap away
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/menu" className="btn-gold">
              Browse Menu <ArrowRight size={14} />
            </Link>
            <Link to="/order?type=dine-in" className="btn-outline">
              🍽️ Dine In
            </Link>
          </div>
        </R>
      </section>
    </>
  )
}
