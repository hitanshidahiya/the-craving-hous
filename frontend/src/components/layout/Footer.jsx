import { Link } from 'react-router-dom'
import { MapPin, Clock, Heart } from 'lucide-react'
import logo from '../../assets/logo.png'
import { cafeInfo } from '../../data'

export default function Footer() {
  return (
    <footer className="bg-ch-brown relative overflow-hidden">

      <div className="h-px bg-gradient-to-r from-transparent via-ch-gold/40 to-transparent" />

      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #EDD9B0 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-6 sm:pb-8">

        {/* ── MOBILE LAYOUT ── */}
        <div className="sm:hidden">
          {/* Brand row */}
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover ring-2 ring-ch-gold/20" />
            <div>
              <p className="font-display font-semibold text-ch-cream text-sm leading-tight">The Craving Hous</p>
              <p className="text-[10px] text-ch-tan tracking-[0.18em] uppercase mt-0.5">Kharar, Punjab</p>
            </div>
          </div>

          {/* Hours + address */}
          <div className="bg-ch-cream/5 rounded-[14px] p-4 mb-4 border border-ch-cream/8">
            <p className="font-display text-ch-cream text-xs font-semibold mb-3 flex items-center gap-1.5">
              <Clock size={11} className="text-ch-gold" /> Opening Hours
            </p>
            <ul className="space-y-1.5">
              {Object.entries(cafeInfo.hours).map(([day, time]) => (
                <li key={day} className="flex justify-between gap-2">
                  <span className="text-ch-cream/40 text-xs">{day}</span>
                  <span className="text-ch-cream/65 text-xs font-medium">{time}</span>
                </li>
              ))}
            </ul>
            <a href={cafeInfo.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-ch-gold/70 text-xs font-medium">
              <MapPin size={11} /> {cafeInfo.address}
            </a>
          </div>

          {/* Social icons */}
          <div className="flex gap-3 mb-5">
            <a href={cafeInfo.instagram} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-ch-cream/6 border border-ch-cream/10 flex items-center justify-center
                text-ch-cream/40 hover:bg-ch-gold hover:text-ch-brown transition-all duration-200"
              aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href={cafeInfo.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-ch-cream/6 border border-ch-cream/10 flex items-center justify-center
                text-ch-cream/40 hover:bg-ch-gold hover:text-ch-brown transition-all duration-200"
              aria-label="Google Maps">
              <MapPin size={15} />
            </a>
          </div>

          <div className="h-px bg-ch-cream/8 mb-4" />
          <p className="text-ch-cream/25 text-[11px] text-center">© 2026 The Craving Hous · All rights reserved</p>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

            {/* Brand col */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center gap-3 mb-5">
                <img src={logo} alt="Logo" className="w-12 h-12 rounded-full object-cover ring-2 ring-ch-gold/20" />
                <div>
                  <p className="font-display font-semibold text-ch-cream text-base leading-tight">The Craving Hous</p>
                  <p className="text-[10px] text-ch-tan tracking-[0.18em] uppercase mt-0.5">Kharar, Punjab</p>
                </div>
              </Link>
              <p className="text-ch-cream/45 text-sm leading-relaxed mb-6 max-w-[260px]">
                A cozy, aesthetic cafe where every corner tells a story worth sharing. Come for the food, stay for the vibe.
              </p>
              <div className="flex gap-3">
                <a href={cafeInfo.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-ch-cream/6 border border-ch-cream/10 flex items-center justify-center
                    text-ch-cream/40 hover:bg-ch-gold hover:text-ch-brown hover:border-ch-gold transition-all duration-200"
                  aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href={cafeInfo.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-ch-cream/6 border border-ch-cream/10 flex items-center justify-center
                    text-ch-cream/40 hover:bg-ch-gold hover:text-ch-brown hover:border-ch-gold transition-all duration-200"
                  aria-label="Google Maps">
                  <MapPin size={15} />
                </a>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1" />

            {/* Menu links */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-ch-cream text-sm font-semibold mb-5 tracking-wide">Menu</h4>
              <ul className="space-y-3">
                {['Burgers', 'Pasta', 'Frappes', 'Desserts', 'Combos'].map(item => (
                  <li key={item}>
                    <Link to="/menu" className="text-ch-cream/40 text-sm hover:text-ch-cream transition-colors duration-200">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-ch-cream text-sm font-semibold mb-5 tracking-wide">Quick Links</h4>
              <ul className="space-y-3">
                {[['Home', '/'], ['Menu', '/menu'], ['Track Order', '/track'], ['Admin', '/admin']].map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-ch-cream/40 text-sm hover:text-ch-cream transition-colors duration-200">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div className="lg:col-span-3">
              <h4 className="font-display text-ch-cream text-sm font-semibold mb-5 tracking-wide flex items-center gap-2">
                <Clock size={13} className="text-ch-gold" /> Opening Hours
              </h4>
              <ul className="space-y-2.5">
                {Object.entries(cafeInfo.hours).map(([day, time]) => (
                  <li key={day} className="flex justify-between gap-4">
                    <span className="text-ch-cream/40 text-xs">{day}</span>
                    <span className="text-ch-cream/65 text-xs font-medium">{time}</span>
                  </li>
                ))}
              </ul>
              <a href={cafeInfo.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-5 text-ch-gold/70 hover:text-ch-gold text-xs font-medium transition-colors">
                <MapPin size={11} /> {cafeInfo.address}
              </a>
            </div>
          </div>

          <div className="h-px bg-ch-cream/8 mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-ch-cream/25 text-xs">© 2026 The Craving Hous · All rights reserved</p>
            <p className="text-ch-cream/25 text-xs flex items-center gap-1.5">
              Made with <Heart size={10} className="text-ch-gold/50 fill-ch-gold/50" /> for{' '}
              <a href={cafeInfo.instagram} target="_blank" rel="noopener noreferrer"
                className="text-ch-gold/50 hover:text-ch-gold transition-colors">
                {cafeInfo.instagramHandle}
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
