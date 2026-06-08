import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import logo from '../../assets/logo.png'

const links = [
  { to: '/',        label: 'Home'     },
  { to: '/menu',    label: 'Menu'     },
  { to: '/#gallery',label: 'Gallery'  },
  { to: '/#reviews',label: 'Reviews'  },
  { to: '/#locate', label: 'Location' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobile]   = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const { pathname }              = useLocation()
  const onHome                    = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* transparent on hero, solid after scroll */
  const bg = scrolled || !onHome
    ? 'bg-ch-parchment/90 backdrop-blur-xl shadow-[0_1px_0_rgba(43,18,6,0.08)]'
    : 'bg-transparent'

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${bg}`}>
      <nav className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobile(false)}>
          <img
            src={logo}
            alt="The Craving Hous"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-ch-gold/20 group-hover:ring-ch-gold/50 transition-all duration-300"
          />
          <div className="hidden sm:block">
            <p className="font-display font-semibold text-ch-brown leading-none text-[15px] tracking-wide">
              The Craving Hous
            </p>
            <p className="text-[10px] text-ch-tan tracking-[0.18em] uppercase leading-none mt-0.5">
              Kharar, Punjab
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-[13px] font-medium tracking-wide transition-colors duration-200
                  ${pathname === l.to
                    ? 'text-ch-brown'
                    : 'text-ch-caramel hover:text-ch-brown'}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 bg-ch-brown text-ch-cream px-4 py-2 rounded-full text-xs font-semibold hover:bg-ch-mocha transition-all duration-200 hover:shadow-[0_4px_16px_rgba(43,18,6,0.25)]"
            aria-label="Open cart"
          >
            <ShoppingBag size={14} />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-ch-gold text-ch-brown text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobile(p => !p)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-ch-brown/8 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X size={18} className="text-ch-brown" />
              : <Menu size={18} className="text-ch-brown" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-ch-parchment backdrop-blur-xl border-t border-ch-brown/8 px-6 py-5 flex flex-col gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobile(false)}
              className="py-3 text-ch-caramel hover:text-ch-brown font-medium text-sm border-b border-ch-brown/5 last:border-0 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/menu"
            onClick={() => setMobile(false)}
            className="mt-3 btn-primary justify-center"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  )
}
